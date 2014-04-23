module.exports = function (db, model) {

    var self = this;

    self.model = model;
    self.db = db;

    /* istanbul ignore next */
    self.findById = function (id, project) {
        return self.db[model].findById(id, project).exec();
    };

    self.findOne = function (select, project) {

        return self.db[model].findOne(select, project).exec();
    }

    self.find = function (select, project) {

        return self.db[model].find(select, project).exec();
    };

    self.create = function(object, cb) {
        return self.db[model].create(object, cb);
    };

    self.update = function (where, update) {

        return self.db[model].update(where, update).exec();
    };

    self.remove = function (where) {

        return self.db[model].remove(where).exec();
    }

    return self;
}