import { View, Modal, ModalProps, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from "phosphor-react-native";
import * as Clipboard from 'expo-clipboard'

import { styles } from './styles';
import { THEME } from "../../theme";
import { Heading } from "../Heading";
import { useState } from "react";

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest}: Props) {
    const [isCopying, setIsCopying] = useState(false);

    async function handleCopyDiscordUserToClipboard() {
        setIsCopying(true);
        await Clipboard.setStringAsync(discord);
        setIsCopying(false);
        
        Alert.alert("Discord copiado!",
            'Usuário copiado para você colar no Discord'
        )
    }

    return (
        <Modal
            animationType="fade"
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <MaterialIcons
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>
                    
                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />
                    
                    <Heading
                        title="Let's play!"
                        subtitle="Agora é só começar a jogar!"
                        style={styles.heading}
                    />
                    
                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>
                    
                    <TouchableOpacity
                        onPress={handleCopyDiscordUserToClipboard}
                        style={styles.discordButton}
                        disabled={isCopying}
                    >
                        <Text style={styles.discord}>
                            {discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}