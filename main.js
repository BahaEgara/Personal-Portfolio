import {mapClasses, previews} from "./data.js";

document.addEventListener("DOMContentLoaded", function() {

    const container = document.querySelector(".container");
    const previewBg = document.querySelector(".preview-bg");
    const item = document.querySelector(".item");
    
    let activePreview = document.querySelector(".preview.default");

    let isMouseOverItem = false;

    const defaultClipsPath = {
        "variant-1": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        "variant-2": "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        "variant-3": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    };

    const variantTransform = {
        "variant-1":{
            title: {x: 75, opacity: 0},
            tags:{x: -75, opacity: 0},
            description: {x: -75, opacity: 0},
        },
        "variant-2":{
            title: {x: -75, opacity: 0},
            tags:{x: -75, opacity: 0},
            description: {x: -5, opacity: 0},
        },
        "variant-3":{
            title: {x: 75, opacity: 0},
            tags:{x: 75, opacity: 0},
            description: {x: 75, opacity: 0},
        },

    };

    function getDefaultClipPath(previewElement){
        for(const variant in defaultClipsPath){
            if(previewElement.classList.contains(variant)){
                return defaultClipsPath[variant];
            }
        }
        return "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)"
    }

    function applyVariantStyles(reviewElement){
        const variant = previewElement.className
        .split(" ")
        .find((className)=>className.startsWith ("variant-"));

        if (variant && variantTransform[variant]){
            Object.entries(variantTransform[variant]). forEach(
                ([elementClass,transform])=>{
                    const element = previewElement.querySelector(
                        `.preview-${elementClass}`
                    );

                    if (element) {
                        gsap.set(element, transform);
                    }
                }
            );
        }
    }

    function changeBg (newImgSrc){
        const newImg = document.createElement("img");
        newImg.src = newImgSrc;
        newImg.style.position = "absolute"
        newImg.style.top = "0"
        newImg.style.left = "0"
        newImg.style.width = "100%"
        newImg.style.height = "100%"
        newImg.style.objectFit = "cover"
        newImg.style.opacity= "0"

        previewBg.appendChild(newImg);


        gsap.to(newImg, {opacity:1,duration:0.5});

        if(previewBg.children.ength>1){
            const oldImg = previewBg.children[0];
            gsap.to(oldImg,{
                opacity:0,
                duration:0.5,
                onComplete:() =>{
                    previewBg.removeChild(oldImg);
                },
            });
        }
    }

previews.forEach((preview, index) =>{
    const previewElement=document.createElement("div");
    previewElement.className = `preview ${mapclasses[index]} preview-${
        index + 1
    }`;
}


}
