import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";

const faqs = [
  {
    question: "What is TradeBlazer?",
    answer: "TradeBlazer is a mobile application for the USTP-CDO community, letting students, faculty, and staff promote and sell their products and services."
  },
  {
    question: "How do I post a product or service?",
    answer: "Go to Add Post, upload photos, enter the product/service name, price, and a short description."
  },
  {
    question: "How do I find products?",
    answer: "Use Categories & Search to organize and find items like food, clothing, gadgets, commissions, and tutoring."
  },
  {
    question: "Can I chat with sellers/buyers?",
    answer: "Yes! In-App Chat allows you to communicate and arrange meet-ups inside the campus."
  },
  {
    question: "Can sellers also buy products?",
    answer: "Yes. Every user can be both a seller and a buyer."
  },
  {
    question: "How do I save items I like?",
    answer: "Use Favorites/Bookmark to save products you’re interested in for easy access later."
  }
];

export default function FAQScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2E5E3E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
      </View>

      <ScrollView style={styles.content}>
        {faqs.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{index + 1}. {item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF2E8" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E5E3E",
    marginLeft: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  faqItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#DCE8D3",
    borderRadius: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E5E3E",
  },
  answer: {
    fontSize: 15,
    color: "#2C4B23",
    marginTop: 5,
  },
});
