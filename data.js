
//data is shared across all scripts and updated at the beginning of each file.. avoids passing data anywhere

var data = '';

function update_data(data_) { 
 data = data_;
 return;
}

module.exports = {
 data: data, 
 update_data: update_data
}