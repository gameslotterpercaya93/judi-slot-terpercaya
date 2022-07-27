'use babel';

import JudiSlotTerpercayaView from './judi-slot-terpercaya-view';
import { CompositeDisposable } from 'atom';

export default {

  judiSlotTerpercayaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.judiSlotTerpercayaView = new JudiSlotTerpercayaView(state.judiSlotTerpercayaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.judiSlotTerpercayaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'judi-slot-terpercaya:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.judiSlotTerpercayaView.destroy();
  },

  serialize() {
    return {
      judiSlotTerpercayaViewState: this.judiSlotTerpercayaView.serialize()
    };
  },

  toggle() {
    console.log('JudiSlotTerpercaya was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
