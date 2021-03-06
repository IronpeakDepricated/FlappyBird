window.Wall = (function() {
	'use strict';
	
	var SPEED = 25;
	
	var WIDTH = 10;
	var HEIGHT = 50;
	
	var Wall = function(el, game, x, y, rotate) {
		this.el = el;
		this.game = game;
		this.pos = { x: x, y: y };
		this.active = true;
		this.collectable = rotate;
		this.rotation = rotate ? 180 : 0;
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)' + ' rotate(' + this.rotation + 'deg)');
	};
	
	Wall.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)' + ' rotate(' + this.rotation + 'deg)');
	};
	
	Wall.prototype.collidedWithPlayer = function(playerX, playerY, playerWidth, playerHeight) {
		var playerMinX = playerX;
		var playerMaxX = playerX + playerWidth;
		var playerMinY = playerY;
		var playerMaxY = playerY + playerHeight;
		var wallMinX = this.pos.x;
		var wallMaxX = this.pos.x + WIDTH;
		var wallMinY = this.pos.y;
		var wallMaxY = this.pos.y + HEIGHT;
		var leftX = Math.max(playerMinX, wallMinX);
		var rightX = Math.min(playerMaxX, wallMaxX);
		var botY = Math.max(playerMinY, wallMinY);
		var topY = Math.min(playerMaxY, wallMaxY);
		return rightX >= leftX && topY >= botY;
	};
	
	Wall.prototype.givePoint = function(playerX) {
		var wallMaxX = this.pos.x + WIDTH;
		if(wallMaxX < playerX)
		{
			this.active = false;
			return this.collectable;
		}
		return false;
	};
	
	Wall.prototype.outOfBounds = function() {
		return this.pos.x < -WIDTH;
	};
	
	return Wall;
	
})();