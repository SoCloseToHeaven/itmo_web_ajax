<?php
    $startTime = hrtime(true);

    if (!(isset($_GET['x']) && isset($_GET['y']) && isset($_GET['r']))) {
        echo 'Not enough parameters';
        http_response_code(422); 
    } else {
        $x = floatval($_GET['x']);
        $y = floatval($_GET['y']);
        $r = floatval($_GET['r']);

        $leftUpperSector = $x <= 0 && $y >= 0 && $x >= -($r / 2) && $y <= $r;
        $leftLowerSector = $x <= 0 && $y <= 0 && ($y >= -2 * $r * $x - $r);
        $rightLowerSector = $x >= 0 && $y <= 0 && ($x*$x + $y*$y < ($r / 2) * ($r / 2));
        
        $hit = $leftLowerSector || $leftUpperSector || $rightLowerSector;

        $executionTime = hrtime(true) - $startTime;

        $attempt = array(
            'x' => $x,
            'y' => $y,
            'r' => $r,
            'success' => $hit,
            'currentTime' => time(),
            'executionTime' => $executionTime/1e+9,
            'color' => 'rgb(' . rand(0, 255) . ',' . rand(0, 255) . ',' . rand(0, 255) . ')'
        );

        header('Content-Type: application/json');
        echo(json_encode($attempt));
    }