import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  ViewChild
} from '@angular/core';
import { NgxBlocklyConfig, NgxBlocklyGenerator } from './ngx-blockly.config';
import { CustomBlock } from './models/custom-block';
import * as Blockly from 'blockly/core';
import { NgxBlocklyToolbox } from './plugins/ngx-blockly.toolbox';
import { dartGenerator } from 'blockly/dart';
import { luaGenerator } from 'blockly/lua';
import { javascriptGenerator } from 'blockly/javascript';
import { phpGenerator } from 'blockly/php';
import { pythonGenerator } from 'blockly/python';

@Component({
  selector: 'ngx-blockly',
  templateUrl: './ngx-blockly.component.html',
  styleUrls: ['./ngx-blockly.component.css']
})
export class NgxBlocklyComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() public config: NgxBlocklyConfig = {};
  @Input() public customBlocks: CustomBlock[] = [];
  @Input() public readOnly = false;
  @Output() public workspaceCreate: EventEmitter<Blockly.WorkspaceSvg> = new EventEmitter<Blockly.WorkspaceSvg>();
  @Output() public workspaceChange: EventEmitter<Blockly.Events.AbstractEventJson> = new EventEmitter<Blockly.Events.AbstractEventJson>();
  @Output() public toolboxChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public dartCode: EventEmitter<string> = new EventEmitter<string>();
  @Output() public javascriptCode: EventEmitter<string> = new EventEmitter<string>();
  @Output() public luaCode: EventEmitter<string> = new EventEmitter<string>();
  @Output() public phpCode: EventEmitter<string> = new EventEmitter<string>();
  @Output() public pythonCode: EventEmitter<string> = new EventEmitter<string>();
  @Output() public xmlCode: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('primaryContainer') primaryContainer: ElementRef;
  @ViewChild('secondaryContainer') secondaryContainer: ElementRef;
  public workspace: Blockly.WorkspaceSvg;
  private _secondaryWorkspace: Blockly.WorkspaceSvg;
  private _resizeTimeout;
  private _finishedLoading = false;

  public static initCustomBlocks(blocks: CustomBlock[]) {
    if (blocks) {
      for (const customBlock of blocks) {
        Blockly.Blocks[customBlock.type] = {
          init: function () {
            const block = new customBlock.class(customBlock.type, customBlock.blockMutator, ...customBlock.args);
            block.init(this);
            this.mixin({
                blockInstance: block
              }
            );
          }
        };
        pythonGenerator[customBlock.type] = function (b) {
          return b.blockInstance.toPythonCode(b);
        };
        dartGenerator[customBlock.type] = function (b) {
          return b.blockInstance.toDartCode(b);
        };
        javascriptGenerator[customBlock.type] = function (b) {
          return b.blockInstance.toJavaScriptCode(b);
        };
        luaGenerator[customBlock.type] = function (b) {
          return b.blockInstance.toLuaCode(b);
        };
        phpGenerator[customBlock.type] = function (b) {
          return b.blockInstance.toPHPCode(b);
        };
        if (customBlock.blockMutator) {
          const mutator_mixin: any = {
            mutationToDom: function () {
              return customBlock.blockMutator.mutationToDom.call(customBlock.blockMutator, this);
            },
            domToMutation: function (xmlElement: any) {
              customBlock.blockMutator.domToMutation.call(customBlock.blockMutator, this, xmlElement);
            },
            saveExtraState: function () {
              return customBlock.blockMutator.saveExtraState.call(customBlock.blockMutator);
            },
            loadExtraState: function (state: any) {
              customBlock.blockMutator.loadExtraState.call(customBlock.blockMutator, state);
            }
          };
          if (customBlock.blockMutator.blockList && customBlock.blockMutator.blockList.length > 0) {
            mutator_mixin.decompose = function (workspace: any) {
              return customBlock.blockMutator.decompose.call(customBlock.blockMutator, this, workspace);
            };
            mutator_mixin.compose = function (topBlock: any) {
              customBlock.blockMutator.compose.call(customBlock.blockMutator, this, topBlock);
            };
            mutator_mixin.saveConnections = function (containerBlock: any) {
              customBlock.blockMutator.saveConnections.call(customBlock.blockMutator, this, containerBlock);
            };
          }
          Blockly.Extensions.unregister(customBlock.blockMutator.name);
          Blockly.Extensions.registerMutator(
            customBlock.blockMutator.name,
            mutator_mixin,
            function () {
              customBlock.blockMutator.afterBlockInit.call(customBlock.blockMutator, this);
            },
            customBlock.blockMutator.blockList
          );
        }
      }
    }
  }

  ngOnInit() {
    NgxBlocklyComponent.initCustomBlocks(this.customBlocks);
  }

  ngAfterViewInit() {
    const readOnly = this.config.readOnly || this.readOnly;
    this.config.readOnly = false;
    this.workspace = Blockly.inject(this.primaryContainer.nativeElement, this.config);
    this.workspace.addChangeListener(this._onWorkspaceChange.bind(this));
    this.workspace.fireChangeListener(new Blockly.Events.FinishedLoading());
    this.workspaceCreate.emit(this.workspace);
    this.resize();
    if (readOnly) {
      this.setReadonly(true);
      this.config.readOnly = true;
    }
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // skip this if the change comes before we are initialized
    if (changes.readOnly && this._secondaryWorkspace) {
      this.setReadonly(changes.readOnly.currentValue);
    }
  }

  ngOnDestroy() {
    if (this.workspace) {
      this.workspace.dispose();
    }
    if (this._secondaryWorkspace) {
      this._secondaryWorkspace.dispose();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    clearTimeout(this._resizeTimeout);
    this._resizeTimeout = setTimeout(() => this.resize(), 200);
  }

  /**
   * Generate code for all blocks in the workspace to the specified output.
   * @param workspaceId Workspace to generate code from.
   */
  public workspaceToCode(workspaceId: string) {
    for (const generator of this.config.generators) {
      switch (generator) {
        case NgxBlocklyGenerator.DART:
          this.dartCode.emit(dartGenerator.workspaceToCode(Blockly.Workspace.getById(workspaceId)));
          break;
        case NgxBlocklyGenerator.LUA:
          this.luaCode.emit(luaGenerator.workspaceToCode(Blockly.Workspace.getById(workspaceId)));
          break;
        case NgxBlocklyGenerator.JAVASCRIPT:
          this.javascriptCode.emit(javascriptGenerator.workspaceToCode(Blockly.Workspace.getById(workspaceId)));
          break;
        case NgxBlocklyGenerator.PHP:
          this.phpCode.emit(phpGenerator.workspaceToCode(Blockly.Workspace.getById(workspaceId)));
          break;
        case NgxBlocklyGenerator.PYTHON:
          this.pythonCode.emit(pythonGenerator.workspaceToCode(Blockly.Workspace.getById(workspaceId)));
          break;
        case NgxBlocklyGenerator.XML:
          this.xmlCode.emit(Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.Workspace.getById(workspaceId))));
          break;
      }
    }
  }

  /**
   * Converts a DOM structure into properly indented text.
   * @return Text representation.
   */
  public toXml(): string {
    return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace));
  }

  /**
   * Clear the given workspace then decode an XML DOM and
   * create blocks on the workspace.
   * @param xml XML DOM..
   */
  public fromXml(xml: string) {
    this._finishedLoading = false;
    Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xml), this.workspace);
    if (this._secondaryWorkspace) {
      Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xml), this._secondaryWorkspace);
    }
  }

  /**
   * Decode an XML DOM and create blocks on the workspace. Position the new
   * blocks immediately below prior blocks, aligned by their starting edge.
   * @param xml The XML DOM.
   */
  public appendFromXml(xml: string) {
    Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(xml), this.workspace);
    if (this._secondaryWorkspace) {
      Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(xml), this._secondaryWorkspace);
    }
  }

  /**
   * Dispose of all blocks in workspace, with an optimization to prevent resizes.
   */
  public clear() {
    if (this.workspace) {
      this.workspace.clear();
    }
  }

  /**
   * Clear the undo/redo stacks.
   */
  public clearUndo() {
    if (this.workspace) {
      this.workspace.clearUndo();
    }
  }

  /**
   * Clear the reference to the current gesture.
   */
  public clearGesture() {
    if (this.workspace) {
      this.workspace.clearGesture();
    }
  }

  /**
   * Clear search input and result set.
   */
  public clearSearch() {
    if (this.workspace) {
      const toolbox = this.workspace.getToolbox() as NgxBlocklyToolbox;
      if (toolbox && typeof toolbox.clearSearch === 'function') {
        toolbox.clearSearch();
      }
    }
  }

  /**
   * Size the workspace when the contents change. This also updates
   * scrollbars accordingly.
   */
  public resize() {
    if (this.workspace) {
      Blockly.svgResize(this.workspace);
    }
    if (this._secondaryWorkspace) {
      Blockly.svgResize(this._secondaryWorkspace);
    }
  }

  public setReadonly(readOnly: boolean) {
    this.readOnly = readOnly;
    if (readOnly) {
      this.secondaryContainer.nativeElement.classList.remove('hidden');
      if (!this._secondaryWorkspace) {
        const config = { ...this.config };
        config.readOnly = true;
        this._secondaryWorkspace = Blockly.inject(this.secondaryContainer.nativeElement, config);
      }
      Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(this.toXml()), this._secondaryWorkspace);
      Blockly.svgResize(this._secondaryWorkspace);
    } else {
      if (this._secondaryWorkspace) {
        this.secondaryContainer.nativeElement.classList.add('hidden');
      }
    }
  }

  public highlightBlock(blockId: string) {
    if (this.workspace) {
      this.workspace.highlightBlock(blockId);
    }
    if (this._secondaryWorkspace) {
      this._secondaryWorkspace.highlightBlock(blockId);
    }
  }

  private _onWorkspaceChange(event: any) {
    this.workspaceChange.emit(event);
    if (event.type === Blockly.Events.FINISHED_LOADING) {
      this._finishedLoading = true;
    }
    if (this._finishedLoading) {
      if (event instanceof Blockly.Events.BlockBase ||
        event instanceof Blockly.Events.VarBase ||
        event instanceof Blockly.Events.CommentBase) {
        this.workspaceToCode(event.workspaceId);
      }
      if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT) {
        this.toolboxChange.emit(event);
      }
    }
  }
}
