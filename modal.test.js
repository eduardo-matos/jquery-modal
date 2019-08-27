const $ = require('jquery');
const Modal = require('./modal');

describe('Modal', () => {
  afterEach(() => $('body').html(''));

  it('adds modal to page', () => {
    new Modal('dummy content').open();
    expect($('body .m-modal .m-content').text()).toEqual('dummy content');
  });

  it('Works with html content', () => {
    new Modal('<p class="spam">dummy content</p>').open();
    expect($('body .m-modal .m-content').html()).toEqual('<p class="spam">dummy content</p>');
  });

  it('Adds close button', () => {
    new Modal('foo').open();
    expect($('.m-modal').find('.m-close').length).toBe(1);
  });

  it('Destroy modal if close button is clicked', () => {
    new Modal('foo').open();

    $('.m-close').trigger('click');
    
    expect($('.m-modal').length).toBe(0);
  });

  it('Calls callback on modal close', () => {
    const onClose = jest.fn();
    new Modal('foo', { onClose }).open();

    $('.m-close').trigger('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('Adds custom css classes', () => {
    new Modal('foo', { cssClasses: 'spam egg' }).open();

    expect($('.m-modal').hasClass('spam')).toBe(true);
    expect($('.m-modal').hasClass('egg')).toBe(true);
  });

  it('Has submit/cancel buttons', () => {
    new Modal('', { confirmBtns: true }).open();

    expect($('.m-confirm').length).toBe(1);
    expect($('.m-cancel').length).toBe(1);
  });

  it('Calls callback on confirm', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    new Modal('', { confirmBtns: true, onConfirm, onCancel }).open();

    $('.m-confirm').trigger('click');
    expect(onConfirm).toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('Calls callback on cancel', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    new Modal('', { confirmBtns: true, onConfirm, onCancel }).open();

    $('.m-cancel').trigger('click');
    expect(onCancel).toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('Closes modal on cancel', () => {
    new Modal('', { confirmBtns: true }).open();

    $('.m-cancel').trigger('click');

    expect($('.m-modal').length).toBe(0);
  });

  it('Closes modal on confirm', () => {
    new Modal('', { confirmBtns: true }).open();

    $('.m-confirm').trigger('click');

    expect($('.m-modal').length).toBe(0);
  });
});