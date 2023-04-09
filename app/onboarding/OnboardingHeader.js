import { Image, StyleSheet, View } from 'react-native';
import Logo from '../../assets/images/Logo.png';

const OnboardingHeader = () => {
  return (
    <>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>
    </>
  );
};

export default OnboardingHeader;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#DEE3E9',
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    height: 60,
    width: '80%',
  },
});
