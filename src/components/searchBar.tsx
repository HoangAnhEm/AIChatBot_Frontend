import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";

const SearchBar = ({handleSearch} : {handleSearch : (searchText : string) => void}) => {
    const [input, setInput] = useState("");
    const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);

    const handleInputChange = (searchInput : string) => {
        if (searchTimer) {
            clearTimeout(searchTimer);
        }
        setInput(searchInput);
        setSearchTimer(
            setTimeout(() => {
                handleSearch(searchInput)
            }, 500),
        );
    }
    
    return (
        <TextInput
        style={styles.searchBox}
        placeholder="Search your transactions"
        value={input}
        onChangeText={handleInputChange}
        />     

    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    searchBox: {
        flex: 1,
        backgroundColor: "rgba(82, 120, 190, 0.5)",
        padding: 10,
        borderRadius: 8,
      },
});

export default SearchBar