import { Text } from 'react-native-paper';


export default function TextTypo({title, size, mh, color, mb, fw, ta, mv, mt, ml}: any) { 
    return <Text style={{
        fontFamily: 'Averta',
        fontSize: size,
        marginHorizontal: mh,
        marginBottom: mb,
        marginTop: mt,
        marginLeft: ml,
        color: color,
        fontWeight: fw,
        textAlign: ta,
        marginVertical: mv
    }}>{title}</Text>
}
