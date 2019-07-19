using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CellManager : MonoBehaviour
{
   public float timeStep = 0.1f;
   public int mapWidth = 15, mapHeight = 15;
   public GameObject cellPrefab;
   public Dictionary<Vector3, GameObject> cells = new Dictionary<Vector3, GameObject>();

   private void Start()
   {
       for (int i = 0; i < mapWidth; i++)
       {
        for (int j = 0; j < mapHeight; j++)
        {
            GameObject thisCell = Instantiate(cellPrefab, new Vector3(i,j), Quaternion.identity);
            thisCell.AddComponent<Cell>().cellManager = this;
            cells.Add(new Vector3(i,j), thisCell); 
        }    
       }
   }
}

