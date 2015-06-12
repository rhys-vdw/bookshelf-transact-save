# [bookshelf-transact-save](https://github.com/rhys-vdw/bookshelf-transact-save)

Plugin for [Bookshelf.js](http://bookshelfjs.org) that allows forcing a transaction when saving models. Useful for saving additional models in handlers for events `saving`, `saved`, `creating` and `created`.

Set `transactSave` to true on a model, and it will always use a transaction when saving.

```JavaScript
bookshelf.plugin(require('bookshelf-transact-save'));

var Person = bookshelf.Model.extend({
  tableName: 'my_model',
  transactSave: true,
  
  initialize: function () {
    this.on('created', this.addLimbs);
  },
  
  limbs: function () { return this.hasMany('Limb'); },

  addLimbs: function (model, resp, options) {
    // Options will always have a `transacting` property, even if save is not
    // called with a transaction.

    // If any of these insertions fail, the transaction will be rolled back,
    // preventing the `Person` model from being inserted.
    return this.limbs().add([
      { name: 'left leg' },
      { name: 'right leg' },
      { name: 'left arm' },
      { name: 'right arm' }
    ]).invokeThen('save', null, options);
  }
});

Person.forge({ name: 'Rhys' }).save();
```
