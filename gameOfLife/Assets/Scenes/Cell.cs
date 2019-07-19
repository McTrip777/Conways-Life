using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Cell : MonoBehaviour
{
    public CellManager cellManager;
    public bool alive;

    SpriteRenderer spriteRender;
    private void Awake()
    {
        spriteRender = GetComponent<SpriteRenderer>();
    }

    public void OnMouseDown()
    {
        alive = true;
        for (int i=0; i<2; i++)
        {
            GameObject newCell;
            if(cellManager.cells.TryGetValue(adjacentCell(i), out newCell))
            {
                newCell.GetComponent<Cell>().alive = true;
            }
        }
    }


    float timer;
    private void Update()
    {
        timer += Time.deltaTime;
        if(timer >= cellManager.timeStep){
            if(!alive)
            {
                spriteRender.color = Color.white;
            }
            else
            {
                spriteRender.color = new Color(
                    Random.Range(0f, 1f), 
                    Random.Range(0f, 1f), 
                    Random.Range(0f, 1f)
                );
            }

            if(alive && GetAdjacentCells() < 2)
            {
                alive = false;
            }
            else if (alive && GetAdjacentCells() <= 3)
            {
                alive = true;
            }
            else if (alive && GetAdjacentCells() > 3)
            {
                alive = false;
            }
            else if (!alive && GetAdjacentCells() == 3)
            {
                alive = true;
            }
            timer = 0;
        }
    }

    GameObject cell;
    public int GetAdjacentCells()
    {
        int count = 0;
        for (int i = 0; i < 8; i++)
        {
            if(cellManager.cells.TryGetValue(adjacentCell(i), out cell))
            {
                if(cell.GetComponent<Cell>().alive)
                {
                    count += 1;
                }
            }
        }
        return count;
    }

    public Vector3 adjacentCell(int i)
    {
        if(i == 0)
        {
            return transform.position + new Vector3(1,0,0);
        }
        else if(i == 1)
        {
            return transform.position + new Vector3(1,-1,0);
        }else if(i == 2)
        {
            return transform.position + new Vector3(0,-1,0);
        }else if(i == 3)
        {
            return transform.position + new Vector3(-1,-1,0);
        }else if(i == 4)
        {
            return transform.position + new Vector3(-1,0,0);
        }else if(i == 5)
        {
            return transform.position + new Vector3(-1,1,0);
        }else if(i == 6)
        {
            return transform.position + new Vector3(0,1,0);
        }else if(i == 7)
        {
            return transform.position + new Vector3(1,1,0);
        }else
        {
            return Vector3.zero;
        }
    }
}