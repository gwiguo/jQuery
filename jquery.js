! function() {
	var domReadyFn = [];

	function jQuery(select) {
		if (/function/i.test(select)) {
			domReadyFn.push(select);
		} else {
			return new jQuery.prototype.init(select);
		}

	}


	jQuery.prototype = {
		init: function(select) {
			var domArr = [],
				_self = this;

			if (/string/i.test(typeof select)) {
				if (/^<.+/.test(select)) {
					var dom = document.createElement('div');
					dom.innerHTML = select;
					domArr = jQuery.prototype.toArray(dom.children);
				} else {
					if (/#/i.test(select)) {
						domArr = jQuery.prototype.toArray([document.getElementById(select.replace('#', ''))])
					} else if (/\./i.test(select)) {
						domArr = jQuery.prototype.toArray(document.getElementsByClassName(select.replace('.', '')))
					}
				}

			}else if(/object/i.test(typeof select)){
				if(select.length) domArr = jQuery.prototype.toArray(select);
				else domArr.push(select);							
			}

			domArr.__proto__ = jQuery.prototype;
			domArr.each(function(item, index, arr) {
				_self[index] = item;
			})
			_self.length = domArr.length;
		},
		toArray: function(obj) {
			return Array.prototype.slice.call(obj)
		},
		each: function(callback) {
			for (var i = 0, len = this.length; i < len; i++) {
				callback.call(this[i], this[i], i, this);
			}
		},
		splice: Array.prototype.splice,
		css: function(attr, val) {
			if (val) { // 两个参数，设置属性
				if (!/px/i.test(val) && /width|height|margin|padding|size/i.test(attr)) {
					val += 'px';
				}
				this.each(function(item, index) {
					item.style[attr] = val;
				});

			} else {
				if (typeof(attr) === 'object') { // 对象批量设置属性
					for (var prop in attr) {
						if (!/px/i.test(attr[prop]) && /width|height|margin|padding|size/i.test(prop)) {
							attr[prop] += 'px';
						}
						this.each(function(item, index) {
							item.style[prop] = attr[prop]
						})
					}
				} else { //获取属性
					return window.getComputedStyle ?
						window.getComputedStyle(this[0])[attr] :
						this[0].currentStyle[attr];
				}
			}
				return this;

		},
		get: function(index) {
			return this[index]
		},
		eq: function(index) {
			return $(this[index])
		},
		addClass: function(classStr) {
			this.each(function(item, index) {
				item.className += " " + classStr
			})
			return this;
		},
		removeClass: function(classStr) {
			this.each(function(item) {
				item.className = item.className.replace(classStr, '');
			})
			return this;
		},
		toggleClass: function(classStr) {
			var reg = new RegExp(classStr)
			this.each(function(item, index, self) {
				if (reg.test(item.className)) {
					item.className = item.className.replace(classStr, '');	
				} else {
					item.className += " " + classStr
				}
			})
			return this;
		},
		html: function(content) {
			if(content){				
				this.each(function(item) {
					item.innerHTML = content
				})
				return this;
			}else{
				return this[0].innerHTML;
			}
		},
		text: function(content) {
			if(content){				
				this.each(function(item) {
					item.innerText = content;
				})
				return this;
			}else{
				return this[0].innerText
			}
		},
		attr:function (prop,val) {
			if(val){//设置属性
				this.forEach(function (item,index) {
					item.style[prop] = val
				})
				return this;
			}else{
				if(typeof(prop) == 'object'){ //设置多个属性
					for(var key in prop){
						this.each(function (item) {
							item.setAttribute(key,prop[key]);
						})
					}
					return this;
				}else{ //获取属性	
					return this[0].getAttribute(prop)
				}
			}
		},
		val:function (value) {
			if(value){
				this.each(function (item) {
					item.value = value
				})
				return this;
			}else{
				return this[0].value;
			}	
		},
		click:function (data,fn) {
			this.each(function (item) {
				item.onclick = fn;
			})
		}

	}

	jQuery.prototype.init.prototype = jQuery.prototype;

	document.onreadystatechange = function() {
		if (/complete/.test(this.readyState)) {
			while (domReadyFn.length) {
				domReadyFn.shift().call(document)
			}
		}
	}

	window.$ = window.jQuery = jQuery;


}()