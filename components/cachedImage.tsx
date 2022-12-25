import { useState, useEffect } from "react";
import { Image } from "react-native";
import shorthash from "shorthash2";
import * as FileSystem from "expo-file-system";
import { PLACEHOLDER_IMAGE } from "../config";

const CachedImage = ({ url, style }: any) => {
    const [uri, setUri] = useState<any>(null);

    useEffect(() => {
        Cached();
    }, []);

    const Cached = async () => {
        const name = shorthash(url);
        const path = `${FileSystem.cacheDirectory}${name}`;
        const image = await FileSystem.getInfoAsync(path);
        if (image.exists) {
            setUri(image.uri);
            return;
        }

        const newImage = await FileSystem.downloadAsync(url, path);
        setUri(newImage.uri)
    }

    return <Image defaultSource={{uri: PLACEHOLDER_IMAGE}} style={style} source={{ uri: url }} />;
}

export default CachedImage;