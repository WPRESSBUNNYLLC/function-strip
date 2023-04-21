var data = ''; //possibly replace with mycharAt and just use an index to go through
function update_data(data_) { 
 data = data_;
 return;
}
module.exports = {
 data: data, 
 update_data: update_data
}