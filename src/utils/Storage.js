import AsyncStorage from '@react-native-async-storage/async-storage';

const AmountKey = 'AmountKey';
export const addAmount = async value => {
  let AllAmount = await getAmount();
  const updatedValue =
    AllAmount && AllAmount?.length > 0 ? JSON.parse(AllAmount) : [];
  const finalAmount = JSON.stringify([...updatedValue, value]);
  await AsyncStorage.setItem(AmountKey, finalAmount);
};

export const getAmount = async () => {
  return await AsyncStorage.getItem(AmountKey);
};
