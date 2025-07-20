import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAmount } from '../utils/Storage';
import FabAction from '../components/FabAction';

const AllTransactionScreen = () => {
  const [allDetails, setAllDetails] = useState([]);

  const navigate = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onLoad = async () => {
        const amount = await getAmount();
        if (amount) {
          setAllDetails(JSON.parse(amount));
        }
      };
      onLoad();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {allDetails?.length > 0 ? (
          allDetails.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.cardTextBlock}>
                  <Text style={styles.paymentMode}>
                    {index + 1}. {item.selectedPaymentMode}
                  </Text>
                  {!!item.selectedPaymentModeSub && (
                    <Text style={styles.paymentSub}>
                      {item.selectedPaymentModeSub} | {item.selectedPaymentType}
                    </Text>
                  )}
                </View>
                <View
                  style={[
                    styles.amountBox,
                    {
                      backgroundColor:
                        item.selectedPaymentType === 'Debit'
                          ? '#e74c3c'
                          : '#2ecc71',
                    },
                  ]}
                >
                  <Text style={styles.amountText}>{item.amount}</Text>
                </View>
              </View>
              <Text style={styles.reasonText}>{item.reasone}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No transactions available</Text>
        )}
      </ScrollView>
      <FabAction onPress={() => navigate.navigate('addMoney')} />
    </SafeAreaView>
  );
};

export default AllTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    backgroundColor: '#f2f2f2',
    position: 'relative',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    paddingHorizontal: 20,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextBlock: {
    flex: 1,
    paddingRight: 10,
  },
  paymentMode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  paymentSub: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  amountBox: {
    minWidth: 90,
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  reasonText: {
    marginTop: 12,
    fontSize: 14,
    color: '#777',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 40,
  },
});
