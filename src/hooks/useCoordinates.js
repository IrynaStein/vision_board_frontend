export default function useCoordinates(coordinates){
    
        let a = coordinates.split(", ");
        let b = a.map((coord) => coord.split(":"));
        let result = {
          x: parseFloat(b[0][1]),
          y: parseFloat(b[1][1]),
        };

return (result);

}