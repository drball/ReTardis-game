#pragma strict

private var speed : float = 2;


function Start () {
	
}

function Update () {
	
	rigidbody.velocity = transform.forward * speed;
	//rigidbody.AddForce(transform.forward * speed);

	//Debug.Log("this velocity = "+rigidbody.velocity);

}

function OnTriggerEnter(other : Collider)
{
	if(other.tag == "Helper")
	{
		//Debug.Log("enemy hit a helper");
		//speed = -speed;
		transform.rotation = other.transform.rotation;
	
		return;
	}
	//Debug.Log("Have hit "+other.name);
}

