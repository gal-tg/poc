var should = require('should');
var exceptions = require('../../domain/exceptions');

describe('exceptions tests: ', function () {
    describe('InvalidOperationError tests ', function () {
        it("should return default message if message did not sent", function () {
            var exception = new exceptions.InvalidOperationError();
            exception.message.should.eql('Operation could not complete');
        });
    });


    describe('DatabaseError tests ', function () {
        it("should return default message if message did not sent", function () {
            var exception = new exceptions.DatabaseError();
            exception.message.should.eql('Database Operation could not complete');
        });
    });
});
