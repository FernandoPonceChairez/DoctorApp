import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isMessageOptionEnabled, setIsMessageOptionEnabled] = useState(false);
  const [isCallOptionEnabled, setIsCallOptionEnabled] = useState(true);
  const [isVideoCallOptionEnabled, setIsVideoCallOptionEnabled] = useState(false);

  return (
    <View>
      {/* Encabezado */}
      <View>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text>Settings</Text>
      </View>

      {/* Opción de Notificaciones */}
      <View>
        <MaterialIcons name="notifications" size={24} />
        <Text>Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={setIsNotificationsEnabled}
        />
      </View>

      {/* Opción de Mensajes */}
      <View>
        <MaterialIcons name="message" size={24} />
        <Text>Message Option</Text>
        <Switch
          value={isMessageOptionEnabled}
          onValueChange={setIsMessageOptionEnabled}
        />
      </View>

      {/* Opción de Llamadas */}
      <View>
        <MaterialIcons name="call" size={24} />
        <Text>Call Option</Text>
        <Switch
          value={isCallOptionEnabled}
          onValueChange={setIsCallOptionEnabled}
        />
      </View>

      {/* Opción de Videollamadas */}
      <View>
        <MaterialIcons name="videocam" size={24} />
        <Text>Video Call Option</Text>
        <Switch
          value={isVideoCallOptionEnabled}
          onValueChange={setIsVideoCallOptionEnabled}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
