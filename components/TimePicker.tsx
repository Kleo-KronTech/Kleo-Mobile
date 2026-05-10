import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WheelPicker from "react-native-wheel-picker-expo";

interface TimePickerProps {
  hours: string;
  minutes: string;
  seconds: string;
  period: "AM" | "PM";
  onHoursChange: (val: string) => void;
  onMinutesChange: (val: string) => void;
  onSecondsChange: (val: string) => void;
  onPeriodChange: (val: "AM" | "PM") => void;
}

const HOUR_DATA = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
const MIN_SEC_DATA = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
const PERIOD_DATA = ["AM", "PM"];

const TimePicker = ({
  hours, minutes, seconds, period,
  onHoursChange, onMinutesChange, onSecondsChange, onPeriodChange,
}: TimePickerProps) => {
  
  
  const renderPicker = (data: string[], value: string, onChange: (val: string) => void, width: number) => {
    
    const pickerProps: any = {
     
      selectedIndex: data.indexOf(value),
      items: data.map(item => ({ label: item, value: item })),
      onChange: ({ item }: any) => onChange(item.value),
      height: 150,
      width: width,
      itemHeight: 45, 
      itemTextStyle: {
      fontSize: 18,
      color: "#999",
    },
    selectedItemTextStyle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#5E54B8",
    },
      selectedIndicatorStyle: styles.selectedIndicator,
      haptics: true, 
    };

    return <WheelPicker {...pickerProps} />;
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Choose Time</Text>
      
      <View style={styles.pickerContainer}>
        {renderPicker(HOUR_DATA, hours, onHoursChange, 60)}
        
        <Text style={styles.timeColon}>:</Text>
        
        {renderPicker(MIN_SEC_DATA, minutes, onMinutesChange, 60)}
        
        <Text style={styles.timeColon}>:</Text>
        
        {renderPicker(MIN_SEC_DATA, seconds, onSecondsChange, 60)}
        
        <View style={{ width: 10 }} /> 

        {renderPicker(PERIOD_DATA, period, (val) => onPeriodChange(val as "AM" | "PM"), 70)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    paddingTop: 12,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 5,
    height: 150,
    justifyContent: 'center',
    overflow: 'hidden', 
  },
  timeColon: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    paddingBottom: 4, 
    marginHorizontal: 2,
  },
  selectedIndicator: {
    backgroundColor: 'rgba(94, 84, 184, 0.1)',
    borderRadius: 8,
    borderWidth: 0, 
    height: 45,
  },
});

export default TimePicker;