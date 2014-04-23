var InvalidOperationError = function (message, chiledException) {
    this.name = "InvalidOperationError";
    this.message = message || "Operation could not complete";
    this.chiledException = chiledException;
};
InvalidOperationError.prototype = new Error();
InvalidOperationError.prototype.constructor = InvalidOperationError;
module.exports.InvalidOperationError = InvalidOperationError;


var DatabaseError = function (message, chiledException) {
    this.name = "DatabaseError";
    this.message = message || "Database Operation could not complete";
    this.chiledException = chiledException;
};
DatabaseError.prototype = new Error();
DatabaseError.prototype.constructor = DatabaseError;
module.exports.DatabaseError = DatabaseError;