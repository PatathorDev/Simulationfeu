<!DOCTYPE html>
<html>
<head>
    <title>Simulation de feu foret</title>
    <meta charset="UTF-8" />
    <script  type="module" src="src/index.js" defer></script>
	<link type="text/css" href="src/style.scss" rel="stylesheet"  media="screen" />
</head>
<?php
    $ini = parse_ini_file('config.ini');
    $height = $ini['height'];
    $width = $ini['width'];
    $nbFire = $ini['initFire'];
    $probability = $ini['probabilityFire'];
?>
<body>
    <div id="formContainer">
        <section id="inputs">
            <table>
                <tbody>
                <tr>
                    <td><label for="width">Largeur</label></td>
                    <td><input id="width" type="number" value="<?php echo $width; ?>" min="0"></input></td>
                </tr>
                <tr>
                    <td><label for="height">Hauteur</label></td>
                    <td><input id="height" type="number" value="<?php echo $height; ?>" min="0"></input></td>
                </tr> 
                <tr>
                    <td><label for="probability">Probabilité de feu</label></td>
                    <td><input id="probability" type="number" value="<?php echo $probability; ?>" step="0.05" min="0" max="1"></input></td>
                </tr> 
                <tr>
                    <td><label for="nbfire">Nb de feu de départ</label></td>
                    <td><input id="nbfire" type="number" value="<?php echo $nbFire; ?>" max="20" min="0"></input></td>
                </tr> 
                <tr>
                    <td><label for="countT">Nb de tours</label></td>
                    <td><input id="countT" type="number" value="0" disabled></input></td>
                </tr>   
                </tbody>  
            </table>
            <button id="start">Start</button>
        </section>
    </div>
    <div id="countContainer"></div>
    <div id="forestContainer">
        <?php 
            for($i = 0; $i < $height; $i++){
                echo '<p class="cell">🌳</p>';
                for($j = 0; $j < $width-1; $j++){
                    echo '<p class="cell">🌳</p>';
                }
            }
        ?>
    </div>
</body>

