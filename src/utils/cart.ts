import { CartItem } from 'models/shop/cart';
import { convertToRupees } from './currency-utils';
import { ozivaPrimeProductId } from './constants';

export const updateCartItems = (cartItems: CartItem[], line_items: any[]) => {
  // this will update missing keys in the cart items in case of missing variant
  let cart_items = [...cartItems];
  cart_items = cart_items.map(item => {
    if (!item.title || !item.price) {
      let currentItem = line_items.filter(val => val.variant_id === item.id);
      if (currentItem.length > 0) {
        item.title = currentItem[0].title;
        item.price = convertToRupees(currentItem[0].price);
        item.compareAtPrice = convertToRupees(currentItem[0].compare_at_price);
        item.productId = currentItem[0].product_id;
        return item;
      } else {
        return item;
      }
    } else {
      return item;
    }
  });
  return cart_items;
};

export const checkIfPrimeItemAddedInCart = (lineItem) => {
  return lineItem.some((item) => item.productId == ozivaPrimeProductId)
}

export const filterVariants = (cartItem, productDetail) => {
  if (productDetail && cartItem && cartItem.price > 0) {
    //Get a filtered variants using option_1 and option_2 values based on the cart item
    let filterVariantList;
    const getFlavourOption = productDetail?.options?.filter(option => {
      return option.name.toLowerCase() === 'flavour' || option.name.toLowerCase() === 'flavor';
    });
    if(productDetail?.variants && productDetail?.variants.length > 1){
      if (getFlavourOption.length > 0) {
        filterVariantList = productDetail?.variants.filter(variant => {
          const price = Number(cartItem.price) > 0 ? Number(cartItem.price)/cartItem.quantity : Number(cartItem.price);
          if (getFlavourOption[0].position == 1) {
            return cartItem.option1 === variant.option1 && cartItem.variant_id != variant.id && variant.price > price;
          } else if (getFlavourOption[0].position == 2) {
            return cartItem.option_2 === variant.option2 && cartItem.variant_id != variant.id && variant.price >= price;
          }
        });
      } else {
        filterVariantList = productDetail?.variants.filter(variant => {
          return cartItem.variant_id != variant.id && variant.price > (cartItem.price);
        });
      }    
    }

    if (filterVariantList) {
      const variantsList = filterVariantList.map(variant => {
        const matchingImage = productDetail?.images.find(image => image.id === variant.imageId);
        if (matchingImage) {
          return { ...variant, src: matchingImage.src };
        }
        return null;
      }).filter(item => item !== null);
      
      //Get the recommended product based on the next higher of cart item
      const recommendedVariant = variantsList.reduce((lowest, variant) => {
        return variant.price < lowest.price ? { ...variant, isRecommended: true } : { ...lowest, isRecommended: true };
      }, variantsList[0]);

      //Get the highest pack - left side pack
      const leftVariant = variantsList.reduce((highest, variant) => {
        return variant.price > highest.price ? variant : highest;
      }, variantsList[0]);

      if (filterVariantList.length === 3) {
        //Right side pack
        const rightVariant = variantsList.reduce((current, variant) => {
          return variant.price > recommendedVariant.price && variant.price < leftVariant.price ? variant : current;
        }, variantsList[0]);
        if (getUniqueVariants([leftVariant, recommendedVariant, rightVariant]).length === 3) return [leftVariant, recommendedVariant, rightVariant];
        else return [recommendedVariant, leftVariant];
      } else if (filterVariantList.length === 2) {
        if (getUniqueVariants([recommendedVariant, leftVariant]).length === 2) return [recommendedVariant, leftVariant];
        else return [recommendedVariant];
      } else if (filterVariantList.length === 1) {
        return [recommendedVariant];
      }
      else return [];
    }
  } else return [];
};

const getUniqueVariants = (listOfVariants) => {
  const uniqueByPrice = listOfVariants.reduce((acc, current) => {
    if (!acc.has(current.price)) {
      acc.set(current.price, current);
    }
    return acc;
  }, new Map());
  return Array.from(uniqueByPrice.values());
}
