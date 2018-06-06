#!/usr/bin/env node

const fs = require('fs');
const file = './list.txt';

console.log('Start reading the file...')
fs.readFile(file, function(err, obj){
	let start_time = +new Date();

	if(err !== null){
		console.log('err:', err)
		return;
	}

	//去除多余的空格和换行
	let items = obj.toString().replace(/\s{2,}/g, '\n').replace(/(^\s+)|(\s+$)/g, '').split('\n');
	let total_len = items.length;
	let remove_len = 0;
	items.forEach(function(val, index){
		
		let len = items.length; 
		for(let i = index+1; i < len; i++){
			if(val == items[i]){
				items.splice(i, 1);
				//原数组长度减一，循环检查的index和len顺次减一
				i--;
				len--;
				remove_len++;
			}
		}

	})

	let end_time = +new Date();
	
	console.log('After simplify:\n', items);

	let run_time = end_time - start_time;
	console.log(`Done in ${run_time}ms`);

	console.log('-----------------------');
	console.log(`Num`);
	console.log(`original: ${total_len}`);
	console.log(`remove: ${remove_len}`);
	console.log('-----------------------');

	let write_file_content = items.join('\n');
	fs.writeFile(file, write_file_content, function(err){
		if(err !== null){
			console.log('err:', err)
			return;
		}

		console.log('success!')
	});
})