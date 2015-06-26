#pragma strict

public var nextLevel : float;

function OnMouseEnter() {
	renderer.material.color = Color.grey;
}

function OnMouseExit (){
	renderer.material.color = Color.white;
}

function OnMouseDown() {
	Application.LoadLevel("scene"+nextLevel);
}