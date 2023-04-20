var inp_as=document.getElementById('a_size'),array_size=inp_as.value;
var inp_gen=document.getElementById("a_generate");
var inp_aspeed=document.getElementById("a_speed");
//var array_speed=document.getElementById('a_speed').value;

var butts_algos=document.querySelectorAll(".algos button");

var div_sizes=[];
var divs=[];
var margin_size;
var cont=document.getElementById("array_container");
cont.style="flex-direction:row";

//Array generation and updation.

inp_gen.addEventListener("click",generate_array);
inp_as.addEventListener("input",update_array_size);

function generate_array()
{
    cont.innerHTML="";

    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=Math.floor(Math.random() * 0.5*(inp_as.max - inp_as.min) ) + 10;
        divs[i]=document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=` margin:0% ${margin_size}%; background:linear-gradient(#3c77e6, #00aaff, #0ef); width:${100 / array_size - (2 * margin_size)}%; height:${div_sizes[i]}%; border-radius: 20px 20px 0 0`;
       
    }
}

function update_array_size()
{
    array_size=inp_as.value;
    generate_array();
}

window.onload=update_array_size();

//Running the appropriate algorithm.
for(var i=0;i<butts_algos.length;i++)
{
    butts_algos[i].addEventListener("click",runalgo);
}

function disable_buttons()
{
    for(var i=0;i<butts_algos.length;i++)
    {
        butts_algos[i].classList=[];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled=true;
        inp_as.disabled=true;
        inp_gen.disabled=true;
        inp_aspeed.disabled=true;
    }
}

function runalgo()
{
    disable_buttons();

    this.classList.add("butt_selected");
    switch(this.innerHTML)
    {
        case "Bubble":Bubble();
                        break;
        case "Selection":Selection_sort();
                        break;
        case "Insertion":Insertion();
                        break;
        case "Merge":Merge();
                        break;
        case "Quick":Quick();
                        break;
        case "Heap":Heap();
                        break;
    }
}

/* --------------------------------------------visualization----------------------------------------------------- */
var speed=1000;

inp_aspeed.addEventListener("input",vis_speed);

function vis_speed()
{
    var array_speed=inp_aspeed.value;
    switch(parseInt(array_speed))
    {
        case 1: speed=1;
                break;
        case 2: speed=10;
                break;
        case 3: speed=100;
                break;
        case 4: speed=1000;
                break;
        case 5: speed=10000;
                break;
    }
    
    delay_time=10000/(Math.floor(array_size/10)*speed);        //Decrease numerator to increase speed.
}

var delay_time=10000/(Math.floor(array_size/10)*speed);        //Decrease numerator to increase speed.
var c_delay=0;//This is updated ov every div change so that visualization is visible.

function div_update(cont,height,color)
{
    window.setTimeout(function(){
        cont.style=" margin:0% " + margin_size + "%; width:" + (100/array_size-(2*margin_size)) + "%; height:" + height + "%; background-color:" + color + "; border-radius: 20px 20px 0 0";
    },c_delay+=delay_time);
}

function enable_buttons()
{
    window.setTimeout(function(){
        for(var i=0;i<butts_algos.length;i++)
        {
            butts_algos[i].classList=[];
            butts_algos[i].classList.add("butt_unselected");

            butts_algos[i].disabled=false;
            inp_as.disabled=false;
            inp_gen.disabled=false;
            inp_aspeed.disabled=false;
        }
    },c_delay+=delay_time);
}


/* --------buttons for phone view-------------- */
var butts_phn =document.querySelectorAll(".algo-optn button");
for(var i=0;i<butts_phn.length;i++)
{
    butts_phn[i].addEventListener("click",runalgo);
}

function disable_buttons()
{
    for(var i=0;i<butts_phn.length;i++)
    {
        butts_phn[i].classList=[];
        butts_phn[i].classList.add("butt_locked");

        butts_phn[i].disabled=true;
        inp_as.disabled=true;
        inp_gen.disabled=true;
        inp_aspeed.disabled=true;
    }
}

function runalgo()
{
    disable_buttons();

    this.classList.add("butt_selected");
    switch(this.innerHTML)
    {
        case "Bubble":Bubble();
                        break;
        case "Selection":Selection_sort();
                        break;
        case "Insertion":Insertion();
                        break;
        case "Merge":Merge();
                        break;
        case "Quick":Quick();
                        break;
        case "Heap":Heap();
                        break;
    }
}

function enable_buttons()
{
    window.setTimeout(function(){
        for(var i=0;i<butts_phn.length;i++)
        {
            butts_phn[i].classList=[];
            butts_phn[i].classList.add("butt_unselected");

            butts_phn[i].disabled=false;
            inp_as.disabled=false;
            inp_gen.disabled=false;
            inp_aspeed.disabled=false;
        }
    },c_delay+=delay_time);
}


/* -----------------------------------------------------bubble sorting --------------------------------------------------------*/
function Bubble()
{
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText="O(N^2)";
    document.getElementById("Time_Average").innerText="Θ(N^2)";
    document.getElementById("Time_Best").innerText="Ω(N)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText="O(1)";

    c_delay=0;

    for(var i=0;i<array_size-1;i++)
    {
        for(var j=0;j<array_size-i-1;j++)
        {
            div_update(divs[j],div_sizes[j],"blue");//Color update

            if(div_sizes[j]>div_sizes[j+1])
            {
                div_update(divs[j],div_sizes[j], "white");//Color update
                div_update(divs[j+1],div_sizes[j+1], "white");//Color update

                var temp=div_sizes[j];
                div_sizes[j]=div_sizes[j+1];
                div_sizes[j+1]=temp;

                div_update(divs[j],div_sizes[j], "white");//Height update
                div_update(divs[j+1],div_sizes[j+1], "white");//Height update
            }
            div_update(divs[j],div_sizes[j], "#0ef");//Color updat
        }
        div_update(divs[j],div_sizes[j], "#FFA500");//Color update
    }
    div_update(divs[0],div_sizes[0], "#FFA500");//Color update

    enable_buttons();
}

/* -------------------------------------------------------------selection sorting----------------------------------------------------- */
function Selection_sort()
{
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText="O(N^2)";
    document.getElementById("Time_Average").innerText="Θ(N^2)";
    document.getElementById("Time_Best").innerText="Ω(N^2)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText="O(1)";

    c_delay=0;

    for(var i=0;i<array_size-1;i++)
    {
        div_update(divs[i],div_sizes[i],"white");//Color update

        index_min=i;

        for(var j=i+1;j<array_size;j++)
        {
            div_update(divs[j],div_sizes[j],"blue");//Color update

            if(div_sizes[j]<div_sizes[index_min])
            {
                if(index_min!=i)
                {
                    div_update(divs[index_min],div_sizes[index_min],"#0ef");//Color update
                }
                index_min=j;
                div_update(divs[index_min],div_sizes[index_min],"white");//Color update
            }
            else
            {
                div_update(divs[j],div_sizes[j],"#0ef");//Color update
            }
        }
        
        if(index_min!=i)
        {
            var temp=div_sizes[index_min];
            div_sizes[index_min]=div_sizes[i];
            div_sizes[i]=temp;

            div_update(divs[index_min],div_sizes[index_min],"white");//Height update
            div_update(divs[i],div_sizes[i],"white");//Height update
            div_update(divs[index_min],div_sizes[index_min],"#0ef");//Color update
        }
        div_update(divs[i],div_sizes[i],"#FFA500");//Color update
    }
    div_update(divs[i],div_sizes[i],"#FFA500");//Color update

    enable_buttons();
}

/* -------------------------------------------------------------------------------insertion sorting------------------------------------------------------- */
function Insertion()
{
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText="O(N^2)";
    document.getElementById("Time_Average").innerText="Θ(N^2)";
    document.getElementById("Time_Best").innerText="Ω(N)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText="O(1)";

    c_delay=0;

    for(var j=0;j<array_size;j++)
    {
        div_update(divs[j],div_sizes[j],"blue");//Color update

        var key= div_sizes[j];
        var i=j-1;
        while(i>=0 && div_sizes[i]>key)
        {
            div_update(divs[i],div_sizes[i],"white");//Color update
            div_update(divs[i+1],div_sizes[i+1],"white");//Color update

            div_sizes[i+1]=div_sizes[i];

            div_update(divs[i],div_sizes[i],"white");//Height update
            div_update(divs[i+1],div_sizes[i+1],"white");//Height update
    
            div_update(divs[i],div_sizes[i],"#0ef");//Color update
            if(i==(j-1))
            {
                div_update(divs[i+1],div_sizes[i+1],"blue");//Color update
            }
            else
            {
                div_update(divs[i+1],div_sizes[i+1],"#0ef");//Color update
            }
            i-=1;
        }
        div_sizes[i+1]=key;

        for(var t=0;t<j;t++)
        {
            div_update(divs[t],div_sizes[t],"#FFA500");//Color update
        }
    }
    div_update(divs[j-1],div_sizes[j-1],"#FFA500");//Color update

    enable_buttons();
}

/* -----------------------------------------------------------merhe sorting----------------------------------------------------- */
function Merge()
{
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText="O(N log N)";
    document.getElementById("Time_Average").innerText="Θ(N log N)";
    document.getElementById("Time_Best").innerText="Ω(N log N)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText="O(N)";

    c_delay=0;

    merge_partition(0,array_size-1);

    enable_buttons();
}

function merge_sort(start,mid,end)
{
    var p=start,q=mid+1;

    var Arr=[],k=0;

    for(var i=start; i<=end; i++)
    {
        if(p>mid)
        {
            Arr[k++]=div_sizes[q++];
            div_update(divs[q-1],div_sizes[q-1],"white");//Color update
        }
        else if(q>end)
        {
            Arr[k++]=div_sizes[p++];
            div_update(divs[p-1],div_sizes[p-1],"white");//Color update
        }
        else if(div_sizes[p]<div_sizes[q])
        {
            Arr[k++]=div_sizes[p++];
            div_update(divs[p-1],div_sizes[p-1],"white");//Color update
        }
        else
        {
            Arr[k++]=div_sizes[q++];
            div_update(divs[q-1],div_sizes[q-1],"white");//Color update
        }
    }

    for(var t=0;t<k;t++)
    {
        div_sizes[start++]=Arr[t];
        div_update(divs[start-1],div_sizes[start-1],"#FFA500");//Color update
    }
}

function merge_partition(start,end)
{
    if(start < end)
    {
        var mid=Math.floor((start + end) / 2);
        div_update(divs[mid],div_sizes[mid],"blue");//Color update

        merge_partition(start,mid);
        merge_partition(mid+1,end);

        merge_sort(start,mid,end);
    }
}
 
/* --------------------------------------------------------------------quick sorting-------------------------------------------------------- */

function Quick()
{
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText="O(N^2)";
    document.getElementById("Time_Average").innerText="Θ(N log N)";
    document.getElementById("Time_Best").innerText="Ω(N log N)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText="O(log N)";

    c_delay=0;

    quick_sort(0,array_size-1);

    enable_buttons();
}

function quick_partition (start, end)
{
    var i = start + 1;
    var piv = div_sizes[start] ;//make the first element as pivot element.
    div_update(divs[start],div_sizes[start],"blue");//Color update

        for(var j =start + 1; j <= end ; j++ )
        {
            //re-arrange the array by putting elements which are less than pivot on one side and which are greater that on other.
            if (div_sizes[ j ] < piv)
            {
                div_update(divs[j],div_sizes[j],"blue");//Color update

                div_update(divs[i],div_sizes[i],"white");//Color update
                div_update(divs[j],div_sizes[j],"white");//Color update

                var temp=div_sizes[i];
                div_sizes[i]=div_sizes[j];
                div_sizes[j]=temp;

                div_update(divs[i],div_sizes[i],"white");//Height update
                div_update(divs[j],div_sizes[j],"white");//Height update

                div_update(divs[i],div_sizes[i],"#0ef");//Height update
                div_update(divs[j],div_sizes[j],"#0ef");//Height update

                i += 1;
            }
    }
    div_update(divs[start],div_sizes[start],"white");//Color update
    div_update(divs[i-1],div_sizes[i-1],"white");//Color update
    
    var temp=div_sizes[start];//put the pivot element in its proper place.
    div_sizes[start]=div_sizes[i-1];
    div_sizes[i-1]=temp;

    div_update(divs[start],div_sizes[start],"white");//Height update
    div_update(divs[i-1],div_sizes[i-1],"white");//Height update

    for(var t=start;t<=i;t++)
    {
        div_update(divs[t],div_sizes[t],"#FFA500");//Color update
    }

    return i-1;//return the position of the pivot
}

function quick_sort (start, end )
{
    if( start < end )
    {
        //stores the position of pivot element
        var piv_pos = quick_partition (start, end ) ;     
        quick_sort (start, piv_pos -1);//sorts the left side of pivot.
        quick_sort (piv_pos +1, end) ;//sorts the right side of pivot.
    }
 }

/* -------------------------------------------------------------------------------------------------heap sorting------------------------------------------------------------------------------ */

function Heap()
{
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText="O(N log N)";
    document.getElementById("Time_Average").innerText="Θ(N log N)";
    document.getElementById("Time_Best").innerText="Ω(N log N)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText="O(1)";

    c_delay=0;

    heap_sort();
    
    enable_buttons();
}

function swap(i,j)
{
    div_update(divs[i],div_sizes[i],"white");//Color update
    div_update(divs[j],div_sizes[j],"white");//Color update

    var temp=div_sizes[i];
    div_sizes[i]=div_sizes[j];
    div_sizes[j]=temp;

    div_update(divs[i],div_sizes[i],"white");//Height update
    div_update(divs[j],div_sizes[j],"white");//Height update

    div_update(divs[i],div_sizes[i],"#0ef");//Color update
    div_update(divs[j],div_sizes[j],"#0ef");//Color update
}

function max_heapify(n,i)
{
    var largest=i;
    var l=2*i+1;
    var r=2*i+2;

    if(l<n && div_sizes[l]>div_sizes[largest])
    {
        if(largest!=i)
        {
            div_update(divs[largest],div_sizes[largest],"#0ef");//Color update
        }

        largest=l;

        div_update(divs[largest],div_sizes[largest],"white");//Color update
    }

    if(r<n && div_sizes[r]>div_sizes[largest])
    {
        if(largest!=i)
        {
            div_update(divs[largest],div_sizes[largest],"#0ef");//Color update
        }

        largest=r;

        div_update(divs[largest],div_sizes[largest],"white");//Color update
    }

    if(largest!=i)
    {
        swap(i,largest);

        max_heapify(n,largest);
    }
}

function heap_sort()
{
    for(var i=Math.floor(array_size/2)-1;i>=0;i--)
    {
        max_heapify(array_size,i);
    }

    for(var i=array_size-1;i>0;i--)
    {
        swap(0,i);
        div_update(divs[i],div_sizes[i],"#FFA500");//Color update
        div_update(divs[i],div_sizes[i],"blue");//Color update

        max_heapify(i,0);

        div_update(divs[i],div_sizes[i],"#0ef");//Color update
        div_update(divs[i],div_sizes[i],"#FFA500");//Color update
    }
    div_update(divs[i],div_sizes[i],"#FFA500");//Color update
}
