import pdfMake from 'pdfmake/build/pdfmake'
// import pdfFonts from 'pdfmake/build/vfs_fonts'
import { mesName, roundToTwo } from '../../../utils/formatConvert';
import { vfs_fonts } from '../../../utils/vfs_fonts';
pdfMake.vfs = vfs_fonts();

const getBase64ImageFromURL = async(url)=> {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
  
        var dataURL = canvas.toDataURL("image/png");
  
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }


  const obtenerValorPorcentual = (valorMonetario,sumaTotales)=>{
    const valorPorcentual = roundToTwo(((valorMonetario)/sumaTotales)* 100)
    const setString = `${valorPorcentual} %`
    return setString
}

const CostoPDF = async(costo,actividades,igv) =>{

    const fechaSeteada = mesName(costo.fecha_presupuesto.split("-")[1])+' - '+ costo.fecha_presupuesto.split("-")[0];

    let arrayLista = [];
    
    const totalCostos =  actividades.map(item=>item.pParcial).reduce((prev,curr)=>(prev+curr),0);

    let arrayResumen = actividades.map((item,index)=>{
        return {
            index: (index+1),
            actividad:item.actividad,
            pParcial : item.pParcial,
            porcentual: obtenerValorPorcentual(item.pParcial,totalCostos)
        }
    });

    arrayResumen.push({
        index: -1,
        actividad:'TOTAL EN SOLES  (S/)',
        pParcial : totalCostos,
        porcentual: '100 %'
    })

    arrayResumen.push({
        index: -1,
        actividad:'',
        pParcial : (parseFloat(totalCostos)*(1+parseFloat(igv))),
        porcentual: 'Con IGV'
    })

    actividades.forEach((item,index) => {
        arrayLista.push({
            actividad:(item.desglose?`${(index+1)}.- ${item.actividad}`:item.actividad),
            cantidad: (item.desglose?'':item.cantidad),
            pUnitario:(item.desglose?'':item.pUnitario),
            pParcial:(item.desglose?'':item.pParcial),
            pTotal:((!item.desglose)?'':item.pParcial),
            desglose:item.desglose,
            pl:0
        })

        if(item.desglose){
            let arrayNivel1 = item.items
            arrayNivel1.forEach((item,index2)=>{
                arrayLista.push({
                    actividad:(item.desglose?`${(index+1)}.${(index2+1)}- ${item.actividad}`:`${item.actividad}`),
                    cantidad: (item.desglose?'':item.cantidad),
                    pUnitario:(item.desglose?'':item.pUnitario),
                    pParcial:(item.desglose?'':item.pParcial),
                    pTotal:((!item.desglose)?'':item.pParcial),
                    desglose:item.desglose,
                    pl:10
                })

                if(item.desglose){
                    let arrayNivel2 = item.items
                    arrayNivel2.forEach((item,index3) => {
                        arrayLista.push({
                            actividad:(item.desglose?`${(index+1)}.${(index2+1)}.${(index3+1)}- ${item.actividad}`:item.actividad),
                            cantidad: (item.desglose?'':item.cantidad),
                            pUnitario:(item.desglose?'':item.pUnitario),
                            pParcial:(item.desglose?'':item.pParcial),
                            pTotal:((!item.desglose)?'':item.pParcial),
                            desglose:item.desglose,
                            pl:20
                        })

                        if(item.desglose){
                            let arrayNivel3 = item.items
                            arrayNivel3.forEach((item,index4) => {
                                arrayLista.push({
                                    actividad: `${item.actividad}`,
                                    cantidad: (item.desglose?'':item.cantidad),
                                    pUnitario:(item.desglose?'':item.pUnitario),
                                    pParcial:(item.desglose?'':item.pParcial),
                                    pTotal:((!item.desglose)?'':item.pParcial),
                                    desglose:item.desglose,
                                    pl:30
                                })
                            });
                        }

                    });
                }
            })
        }
    });

    const lista = arrayLista.map(({actividad,cantidad,pUnitario,pParcial,pTotal,desglose,pl})=>{
        return {
            columns: [
                {
                    text: actividad,
                    width: 270,
                    fontSize:7,
                    bold:desglose,
                    margin:[pl,6,6,0]
                },
                {
                    text:cantidad,  
                    width: 60,
                    fontSize:7,
                    alignment:'center',
                    margin:[0,6,6,0]
                },
                {
                    text:pUnitario,  
                    width: 60,
                    fontSize:7,
                    bold:true,
                    alignment:'right',
                    margin:[0,6,6,0]
                },
                {
                    text:pParcial,  
                    width: 60,
                    fontSize:7,
                    bold:true,
                    alignment:'right',
                    margin:[0,6,6,0]
                },
                {
                    text:pTotal,  
                    width: 60,
                    fontSize:7,
                    bold:true,
                    alignment:'right',
                    margin:[0,6,6,0]
                },

            ] 
        }
    });


    const listaResumen = arrayResumen.map(({ index,actividad,pParcial,porcentual})=>{
        return {
            columns: [
                {
                    text: (index!=-1?`${index}.- ${actividad}`:actividad),
                    width: 270,
                    fontSize:7,
                    bold:true,
                    margin:[(index!=-1?0:10),(index!=1?4:20),4,0]
                },
                {
                    text:'',  
                    width: 60,
                    fontSize:7,
                    alignment:'center',
                    bold:true,
                    margin:[0,(index!=1?4:20),4,0]
                },
                {
                    text:porcentual,  
                    width: 60,
                    fontSize:7,
                    bold:true,
                    alignment:'right',
                    margin:[0,(index!=1?4:20),4,0]
                },
                {
                    text:pParcial,  
                    width: 60,
                    fontSize:7,
                    bold:true,
                    alignment:'right',
                    margin:[0,(index!=1?4:20),4,0]
                },
                {
                    text:'',  
                    width: 60,
                    fontSize:7,
                    bold:true,
                    alignment:'right',
                    margin:[0,(index!=1?4:20),6,0]
                },

            ] 
        }
    });

    const contentPDF =  {
        pageSize: 'A4',
        content: [
            {
                columns: [
                    {
                        image: await getBase64ImageFromURL("../images/logo.png"),        
                        width: 35,
                        height: 50,
                    },
                    {
                        text:'Universidad Nacional de Ingeniería \n Oficinal Central de Admisión',
                        fontSize: 7
                    },
                ] 
            },
            {
                text: costo.documento,
                alignment:'center',
                fontSize:9,
                bold:true
            },
            {
                text: `${costo.postulantes} postulantes \n\n`,
                alignment:'center',
                fontSize:9,
                bold:true
            },
            {
                text: costo.proceso_uni + '\n\n',
                alignment:'center',
                fontSize:9,
                bold:true
            },
            {
                text: costo.cliente,
                alignment:'center',
                fontSize:12,
                bold:true,
                color: '#444',
                italics: true
            },
            {
                text: costo.proceso_cliente,
                alignment:'center',
                fontSize:12,
                bold:true,
                color: '#444',
                italics: true
            },
            {
                text: `\n${fechaSeteada}\n\n`,
                alignment:'center',
                fontSize:9,
                bold:true
            },
            {
                columns: [
                    {
                        text:'ACTIVIDAD',  
                        width: 270,
                        fontSize:7,
                        bold:true,
                        alignment:'center',
                    },
                    {
                        text:'Cantidad',  
                        width: 60,
                        fontSize:7,
                        bold:true,
                        alignment:'center',
                    },
                    {
                        text:'P.Unitario',  
                        width: 60,
                        fontSize:7,
                        bold:true,
                        alignment:'right',
                    },
                    {
                        text:'Parcial',  
                        width: 60,
                        fontSize:7,
                        bold:true,
                        alignment:'right',
                    },
                    {
                        text:'Total',  
                        width: 60,
                        fontSize:7,
                        bold:true,
                        alignment:'right',
                    },

                ] 
            },
            ...lista,
            ...listaResumen 
        ]
    }

    const pdf = pdfMake.createPdf(contentPDF);
    let nameDocument = costo.documento.replace(' ','_') + ".pdf";
    pdf.download(nameDocument);
}

export default CostoPDF