import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type CategoryItemProps = {
  name: string;
  value: number;
  color: string;
  icon?: string;
  onPress?: () => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ name, value, color, icon = "shopping-basket", onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
          <Icon name={icon} size={18} color={color} />
        </View>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.expand}></View>
      <Text style={styles.value}>{value}</Text>
      <Icon name="chevron-right" size={14} color="#999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 6,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  expand: {
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
  },
});

export default CategoryItem;
