const $ = require('jquery');

function tryCall(obj, method) {
  typeof obj[method] === 'function' && obj[method]();
}

module.exports = class {
  constructor(content, opts = {}) {
    this.content = content;
    this.opts = opts;
  }

  open() {
    this.$modal = this.initModal();
    this.$modal.appendTo('body');
    this.setupEvents();
  }

  initModal() {
    return $(`
    <div class="m-modal ${this.opts.cssClasses || ''}">
      <div class="m-content">${this.content}</div>
      <div class="m-close">&times;</div>
      ${this.opts.confirmBtns && `
        <div>
          <button class="m-cancel">Cancel</button>
          <button class="m-confirm">Confirm</button>
        </div>`}
    </div>
  `);
  }

  setupEvents() {
    this.$modal.find('.m-close').on('click', () =>
      this.die() && tryCall(this.opts, 'onClose'));

    this.$modal.find('.m-confirm').on('click', () =>
      this.die() && tryCall(this.opts, 'onConfirm'));

    this.$modal.find('.m-cancel').on('click', () =>
      this.die() && tryCall(this.opts, 'onCancel'));
  }

  die() {
    this.$modal.remove();
    return true;
  }
}