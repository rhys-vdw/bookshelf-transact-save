module.exports = function (bookshelf) {
  var proto = bookshelf.Model.prototype;

  var Model = bookshelf.Model.extend({
    transactSave: false,
    save: function (attrs, options) {
      var self = this;
      if (!options) options = {};
      if (this.transactSave && !options.transacting) {
        return bookshelf.transaction(function(trx) {
          options.transacting = trx;
          return proto.save.call(self, attrs, options);
        });
      } else {
        return proto.save.call(self, attrs, options);
      }
    }
  });

  bookshelf.Model = Model;
}
