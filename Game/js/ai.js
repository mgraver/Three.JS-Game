function AI(aiGeometry, aiMaterial) {
  if (aiMaterial == null)
    this.aiMesh = aiGeometry;
  else
    this.aiMesh = new Physijs.BoxMesh(aiGeometry, aiMaterial,1);

   this.alive = true;
   this.zDirection = 0;
   this.xDirection = 0;
   this.rotationAngle = 0;

   this.getDistance = distance;
   this.move = moveMesh;
   this.isAlive = checkLife;
   this.kill = killAi;

}


function distance(target) {
  diffX = target.position.x - this.aiMesh.position.x;
  diffZ = target.position.z - this.aiMesh.position.z;

  diffX = Math.pow(diffX, 2);
  diffZ = Math.pow(diffZ, 2);

  distance = Math.sqrt(diffX + diffZ);
  return distance;
}

function moveMesh( target ) {
  //If target is close enough follow.
  if (this.getDistance(target) <= 400) {
    diffX = target.position.x - this.aiMesh.position.x;
    diffZ = target.position.z - this.aiMesh.position.z;

    rad = Math.atan(diffZ/diffX);

    if (diffX < 0)
      rad += Math.PI;

    this.rotationAngle = (rad + Math.PI/2) * -1;
    this.zDirection = Math.sin(rad) * 2;
    this.xDirection = Math.cos(rad) * 2;

      // At start of game the funtions acted weird this debug code for what to do when
      // the funtion acts weird.
      if (isNaN(this.zDirection))
        this.zDirection = 0;

      if (isNaN(this.xDirection))
        this.xDirection =0;

  } else {
    //Move randomly around if theres no target to follow.
    changeTime = Math.floor(Math.random() * (120 - 1) + 1);
    if (changeTime == 21) {
      randomAngle = Math.random() * (2 * Math.PI);
      this.rotationAngle = (randomAngle + Math.PI/2) * -1;
      this.zDirection = Math.sin(randomAngle);
      this.xDirection = Math.cos(randomAngle);
    }
  }

    this.aiMesh.position.z += this.zDirection;
    this.aiMesh.position.x += this.xDirection;
    this.aiMesh.__dirtyPosition = true;

    this.aiMesh.rotation.y = this.rotationAngle;
    this.aiMesh._dirtyRotation = true;
}

function checkLife() {
  return this.alive;
}

function killAi() {
  this.alive = false;
}
