import { Text } from 'react-native-paper';


export default function TextTypo({fontFamily = 'Averta', title, size, mh, color, mb, fw, ta, mv, mt, ml}: any) { 
    return <Text style={{
        fontFamily: fontFamily,
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
