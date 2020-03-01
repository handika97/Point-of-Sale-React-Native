import React from 'react';
import {View} from 'react-native';
import {
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';

const ListItemComp = () => {
  return (
    <View>
      <Content>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{uri: 'Image URL'}} />
            </Left>
            <Body>
              <Text>Kumar Pratik</Text>
              <Text note>
                Doing what you like will always keep you happy . .
              </Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
          </ListItem>
        </List>
      </Content>
    </View>
  );
};

export default ListItemComp;
