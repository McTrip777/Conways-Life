// using System.Diagnostics;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RandomCellGenerator : MonoBehaviour
{
    SpriteRenderer spriteRender;
    private void Start()
    {
        spriteRender = GetComponent<SpriteRenderer>();
    }
    private void Update()
    {
    }
    public void Random()
    { 
        if(Cell.alive == false){
            if(UnityEngine.Random.value > 0.75f)
            {
                Cell.alive = true;
            }else{
                Cell.alive = false;
            }
        }    
        
        
    }

}
