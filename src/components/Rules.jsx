const Title = ({ children }) => <h2 className="text-2xl">{children}</h2>

export default () => {
    return (
        <div>
            <Title>Déroulement d’une manche</Title>
            II – Déroulement de la partie La partie se déroule en 4 manches maximum : 1. Déroulement d’une manche Les joueurs discutent entre eux et
            annoncent le nombre de cartes désamorçage qu’ils possèdent. Les joueurs peuvent bluffer. Ce n’est pas précisé dans la règle, mais beaucoup
            de joueurs indiquent en début de manche le nombre de cartes câbles de désamorçage qu’ils ont dans leur jeu avec un geste de la main
            (constellation des doigts). Lorsque votre choix est fait, en commençant par le 1er joueur, prenez le jeton Pince Coupante (ou la carte
            Pince coupante, au choix) et posez-le devant la Carte Câble que vous désirez couper chez un autre joueur. Il est interdit de couper vos
            propres Câbles. Révélez la Carte Câble coupée au centre de la table. Câble sécuriséS’il s’agit d’un Câble sécurisé : il ne se passe rien.
            Carte désamorçageS’il s’agit d’une Carte désamorçage : écartez-là des autres cartes Câbles révélées afin qu’elle soit bien visible. Toutes
            les Cartes Désamorçage forment ainsi un petit paquet. Si vous tombez sur la dernière Carte Désamorçage (il y en a une par joueur),
            l’équipe Sherlock remporte immédiatement la partie. Carte BombeS’il s’agit de la Carte Bombe : l’équipe Moriarty remporte immédiatement la
            partie. Le joueur qui révèle sa Carte Câble prend automatiquement la main (symbolisée par la pince Coupante) et procède de la même
            manière. 2. Fin de la Manche La manche se termine lorsque le nombre de Cartes Câble révélées au cours de la manche est égal au nombre de
            joueurs. Rassemblez toutes les Cartes Câbles non coupées (face cachée) chez tous les joueurs et mélangez-les sans les regarder. Distribuez
            de nouveau les Cartes Câble, face cachée, de sorte que tous les joueurs en aient le même nombre . Répétez l’étape 5 de la mise en place. A
            chaque nouvelle manche, chaque joueur a donc une carte de moins qu’au début de la manche précédente. Une nouvelle manche commence et le
            dernier joueur à avoir reçu le jeton Pince Coupante durant la manche précédente devient le premier joueur. 3. Fin de la partie La partie
            se termine immédiatement si l’une des trois conditions suivantes est remplie : Tous les Câbles de désamorçage ont révélés (au nombre de un
            par joueur). L’équipe Sherlock gagne immédiatement la partie. La Bombe est révélée. L’équipe Moriarty gagne immédiatement la partie. A la
            fin des 4 manches, aucune des deux conditions précédentes n’est atteinte. L’équipe Moriarty gagne la partie.
        </div>
    )
}
