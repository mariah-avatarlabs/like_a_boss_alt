/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const Animation = require('Animation');
const Materials = require('Materials');
const Reactive = require('Reactive');
const Patches = require('Patches');

const Diagnostics = require('Diagnostics');
const Textures = require('Textures');
const TouchGestures = require('TouchGestures');


// -- ANIM LETTER WIPE -- //
// const frame_rectangleObj = Scene.root.find('frame_rectangle');
const affirmationMat = Materials.get('affirmations_material');

var killinItText = Textures.get('_Killin')
var winninText = Textures.get('_Winning')
var fearlessText = Textures.get('_Fearless')
var glowinText = Textures.get('_Glowing')

var textueArr = [winninText, glowinText, killinItText, fearlessText];
var frameCount = 3
var currFrame = 0;
var isRunning = false;

affirmationMat.diffuse = textueArr[currFrame];


// -- AFFIR FADE IN -- //
// const affDriverParam = {
//     durationMilliseconds: 1000,
//     loopCount: 1,
//     mirror: true
// }
// const affDriver = Animation.timeDriver(affDriverParam);
// affDriver.onCompleted().subscribe(() => {
//     isRunning = false;
// })
// affDriver.start();

// const affSampler = Animation.samplers.easeInQuint(0,1);
// const affirAnim = Animation.animate(affDriver,affSampler);
// affirmationMat.opacity = affirAnim;





// -- ITARATE TEXTURES -- //
const frame_rectangleObj = Scene.root.find('frame_rectangle');



// -- FRAM ANIM IN SCALE -- //

const affir_rect = Scene.root.find('affirmation_rectangle');

const affirScaleDriverParams = {
    durationMilliseconds: 1000,
    loopCount: 1,
    mirror: true
};

const affirScaleDriver = Animation.timeDriver(affirScaleDriverParams);
affirScaleDriver.start();

const affirScaleSampler = Animation.samplers.easeOutQuint(1.5, 1.0);
const affirScaleAnim = Animation.animate(affirScaleDriver, affirScaleSampler);

affir_rect.transform.scaleX = affirScaleAnim;
affir_rect.transform.scaleY = affirScaleAnim;


// -- TAP CONTROL -- //

TouchGestures.onTap(frame_rectangleObj).subscribe((gesture) => {


    affirScaleDriver.reset();
    affirScaleDriver.start();
    
    if(currFrame + 1 <= 3){
        currFrame++;
    } else {
        currFrame = 0
    }

    affirmationMat.diffuse = textueArr[currFrame];


})



// -- LOGO BOUNCE IN -- //
const logoRect = Scene.root.find('logo_rectangle');

const logoBounceDriverParam = {
    durationMilliseconds: 1200,
    loopCount: 1,
    mirror: false
};

const logoBounceDriver = Animation.timeDriver(logoBounceDriverParam);
logoBounceDriver.start();

const logoBounceSampler = Animation.samplers.easeInElastic(0, 1.0);
const logoBounceAnim = Animation.animate(logoBounceDriver, logoBounceSampler);
// logoRect.scaleU= affirWipeAnim;




// -- ACTIVATE GLITTER -- //
const glitterFullMaterial = Materials.get('glitter_full_material');
glitterFullMaterial.opacity =  Reactive.val(0.0);

const baseDriverParameters = {
    durationMilliseconds: 1850,
    loopCount: 1,
    mirror: true
};

const baseDriver = Animation.timeDriver(baseDriverParameters);
baseDriver.start();

const baseSampler = Animation.samplers.easeInQuint(0,1);
const baseAnimation = Animation.animate(baseDriver,baseSampler);
glitterFullMaterial.opacity = baseAnimation;

