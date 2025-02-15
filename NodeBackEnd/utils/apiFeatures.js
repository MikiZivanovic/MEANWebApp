class ApiFeatures {
    constructor(data, queryObjectString) {
        this.data = data;  
        this.queryObjectString = queryObjectString;
    }
    
    pagination() {
        if (this.queryObjectString.page) {
            const page = this.queryObjectString.page * 1 || 1;
            const limit = this.queryObjectString.limit * 1 || 4;
            const skip = (page - 1) * limit;

            this.data = this.data.slice(skip, skip + limit);  
        }
        return this;
    }
  }
  module.exports = ApiFeatures;