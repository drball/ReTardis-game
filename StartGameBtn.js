#pragma strict

var hoverColor = Color(.1,.9,.5, 1);
var defaultColor = Color(.5,.5,1, 1);

function Start()
{
	//var defaultColor = renderer.material.GetColor("_Color");
}

function OnMouseEnter() {
	renderer.material.SetColor( "_Color", hoverColor);
}

function OnMouseExit (){
	renderer.material.SetColor( "_Color", defaultColor);
}

function OnMouseDown() {
	Application.LoadLevel("scene1");
}

function Update()
{
	if(Input.GetKeyDown(KeyCode.Escape) == true)
	{
		Application.Quit();
	}
}
