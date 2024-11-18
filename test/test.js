const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.floor(Math.random() * 10) +3;
        this.velocity = {
            x : Math.random() * 4 - 2,
            y : Math.random() * 4 - 2,
        }
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        //La méthode "arc" est utilisée pour dessiner un cercle. Les paramètres sont les coordonnées x et y du centre du cercle, le rayon du cercle (défini par la propriété "radius" de l'objet actuel), l'angle de départ (0) et l'angle final (2 * Math.PI, qui est équivalent à un cercle complet).
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        //La méthode "fill()" est utilisée pour remplir la forme avec la couleur spécifiée par la propriété "fillStyle". 
        ctx.fill();

    }
    //Je crée une nouvelle méthode update() dans laquelle je commence par vérifier si la particule dépasse le bord droit ou gauche du canvas, au quel cas j'inverse sa direction.
    update(){
        //collision des murs
        if(this.x + this.radius> canvas.width ||
            this.x - this.radius<0){
                this.velocity.x *= -1
            }else if(this.y + this.radius > canvas.height || 
                this.y - this.radius < 0){
                    this.velocity.y *= -1
                };
        // Je mets à jour la position de la particule en ajoutant la valeur stockée dans l'objet 'velocity.x' à sa position horizontale actuelle, et ajoute la valeur stockée dans l'objet 'velocity.y' à sa position verticale.   
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    
    }
	checkCollision(){
		//colision entre particules
		particlesArray.forEach(particle => {
			if ( particle === this) return; 

			const dx = this.x - particle.x
			const dy = this.y - particle.y

			//La fonction Math.sqrt() utilise le théorème de Pythagore pour calculer la racine carrée de la somme des carrés des constante dx et dy, donnant ainsi la distance euclidienne (la distance la plus courte entre deux points) entre les deux particules.
			const distance = Math.sqrt(dx * dx * dy * dy);

			if(distance <= this.radius + particle.radius){

				//Dans ce cas, je stocke la vitesse de la particule actuelle (this) dans les constantes tempX et tempY.
				const tempX = this.velocity.x;
				const tempY = this.velocity.y;

				// Je remplace la vitesse de la particule actuelle (this) par celle avec laquelle elle est entrée en collision (particle).
				this.velocity.x = particle.velocity.x;
				this.velocity.y = particle.velocity.y;

				//La vitesse de cette dernière est remplacée par les valeurs stockées dans les constantes tempX et tempY, ce qui permet d'échanger les vitesses des deux particules.
				particle.velocity.x = tempX;
				particle.velocity.ys = tempY;

			}
		
		})
	}
}

//Je déclare une constante 'particlesArray qui est initialisée à un tableau vide.
const particlesArray = [];

//La fonction createParticle(e) est appelée lorsqu'un événement de clic de souris se produit sur le canvas. je commence par récupèrer les coordonnées x et y du clic de souris à l'aide de e.clientX et e.clientY, respectivement.
function createParticle(e){

    let posX = e.clientX;
    let posY = e.clientY;
    const colorArray = ['crimson', 'white' , 'blue' , 'purple' , 'green'];
    const color = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    //Enfin, je crée une nouvelle particule en utilisant les coordonnées récupérées et la couleur aléatoire. Puis je l'ajoute à la fin de mon tableau particlesArray à l'aide de la méthode push().
    const particle = new Particle(posX, posY, color);
    particlesArray.push(particle)
};

//J'ajoute un événement au clique sur le Canvas qui appelle la fonction createParticle(e).
canvas.addEventListener('click', createParticle);
canvas.addEventListener('click', function(){
    console.log("bonjour");
});

function gameloop(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle =>{
        particle.update();
    } )

    // A chaque boucle, la fonction gameLoop() commence par nettoyer le Canvas avec la méthode clearRect().
    requestAnimationFrame(gameloop)

}
//J'ajoute un événement au clique sur le Canvas qui appelle la fonction createParticle(e).
gameloop();

function createParticlesRandomly(numberOfParticles) {
    for (let i = 0; i < numberOfParticles; i++) {
        const fakeEvent = {
            clientX: Math.random() * window.innerWidth,
            clientY: Math.random() * window.innerHeight,
        };
        createParticle(fakeEvent);
    }
}

// Utilisez la nouvelle fonction avec le nombre de particules que vous souhaitez créer
createParticlesRandomly(5); // Changez le nombre selon vos besoins