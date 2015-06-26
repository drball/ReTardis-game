#pragma strict

private var player : GameObject;
private var winMenu : GameObject;
private var playerStartPos : Vector3;
private var levelCompleted;

public var sparkleSpawn : GameObject;

function Start () {
	player = GameObject.Find("Player");
	playerStartPos = player.transform.position;
	
	winMenu = GameObject.Find("Win menu wrapper");
	
	StartLevel();
}

function Update () {
	//player.transform.Rotate(0,0,50);
	
	if(Input.GetKeyDown(KeyCode.Escape) == true)
	{
		Application.LoadLevel("menu");
	}
}

function StartLevel(){

	
	//playerStartPos = Vector3(-7.5,-2,0);
	//Instantiate(player,playerStartPos,Quaternion.identity);
	player.transform.position = playerStartPos;
	player.transform.rotation = Quaternion.identity;
	
	//--create sparkle around player
	var sparkleStartPos = Vector3(playerStartPos.x, playerStartPos.y-3, playerStartPos.z);
	var spk = Instantiate (sparkleSpawn, playerStartPos, Quaternion.identity);
	Destroy(spk,3);

	//--make player not paused
	player.rigidbody.isKinematic = false;
	player.SetActive(true);
	player.rigidbody.velocity = Vector3.zero;
	player.rigidbody.angularVelocity = Vector3.zero;
	
	//--hide win menu
	winMenu.SetActive(false);
	
	
	levelCompleted = false;
} 

//--restart the level after being killed
function RestartLevel() {

	StartLevel();
}

//--reset game after a while
function StartResetTimer() {

	Invoke("RestartLevel",2);
}

function StartWinTimer () {
	Invoke("LevelComplete",.5);
}

function LevelComplete () {
	winMenu.SetActive(true);
}

