#pragma strict

private var playerObject : GameObject;


function Start () {
	playerObject = GameObject.Find("Player"); 
}

function Update () {
	transform.position.x = playerObject.transform.position.x;
}