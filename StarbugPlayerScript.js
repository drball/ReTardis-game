﻿#pragma strict
private var speed : float = 140;
private var rotationSpeed : float = 20;
private var gameController : GameControllerScript;
private var playerVFXObject : GameObject;
private var badRotationTimer : float;
private var myTorque : float = 0;

var ThrustParticleLeft : ParticleSystem;
var ThrustParticleRight : ParticleSystem;


var explosionVFX : GameObject;

function Start () {
	playerVFXObject = GameObject.Find("PlayerVFX"); 
	
	//-find the gameController so we can reference its functions
	var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
	gameController = gameControllerObject.GetComponent (GameControllerScript);
	 

	ThrustParticleLeft.enableEmission = false;
	ThrustParticleRight.enableEmission = false;

}

function FixedUpdate () {
	//var translation : float = Input.GetAxis("Vertical") * speed;
	//var rotation : float = Input.GetAxis("Horizontal") * -rotationSpeed;
	
	//rotation *= Time.deltaTime;
	
	//transform.Rotate (0,0,rotation);
	
	playerVFXObject.transform.Rotate(0,myTorque,0);
	
	if(Input.GetKey("left"))
	{
		rigidbody.AddRelativeTorque (0,0,-rotationSpeed);
		rigidbody.AddRelativeForce (Vector3.up * speed);
	
		ThrustParticleLeft.enableEmission = true;

	}else{
		ThrustParticleLeft.enableEmission = false;
	}
	
	if(Input.GetKey("right"))
	{
		rigidbody.AddRelativeTorque (0,0,rotationSpeed);
		rigidbody.AddRelativeForce (Vector3.up * speed);
		
		ThrustParticleRight.enableEmission = true;

	} else {
		ThrustParticleRight.enableEmission = false;
	}
	
}

function Update ()
{
	//var TimerText : GUIText = GameObject.Find("TimerText").guiText;
	
	//--count how long it's been on it's side.	
	if( (transform.eulerAngles.z >= 80) && (transform.eulerAngles.z <= 280) )
	{
		badRotationTimer++;
	} else {
		badRotationTimer = 0;
	}
	
	//--restart of been on it's side for more than 3 seconds
	if( (badRotationTimer*Time.deltaTime) > 3){
		gameController.RestartLevel();
	}
	//TimerText.text = "d"+badRotationTimer*Time.deltaTime;
	
	
}

function OnCollisionEnter(theCollision : Collision)
{
	if(theCollision.gameObject.tag == "Enemy")
	{
		Debug.Log("hit enemy");
		var exp : GameObject = Instantiate(explosionVFX,transform.position, transform.rotation);
		//Destroy(gameObject);
		gameObject.SetActive(false);
	
		//--reset the game in 2 seconds
		gameController.StartResetTimer();
		
	}
}

function OnTriggerEnter(other : Collider)
{
	if(other.name == "Goal")
	{
		Debug.Log("reached goal");
		
		
		//--pause the player while we animate to next level
		rigidbody.isKinematic = true;
		
		//gameController.StartResetTimer();
		gameController.StartWinTimer();
		rigidbody.AddRelativeTorque(100,10,10);
	
		return;
	} else if (other.tag == "Boundary") {
		Debug.Log("Boundary 3");
		gameController.RestartLevel();
	}
	Debug.Log("Have hit "+other.name);
}