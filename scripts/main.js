$(document).ready(function () {
  const modalsNames = [".contacts", ".search", ".favourites", ".auth", ".cart", ".register"];

  const closeModals = () => {
    modalsNames.forEach((name) => {
      const modal = $(`${name}Modal`);
      if (modal.hasClass("open")) {
        modal.addClass("closed");
        modal.removeClass("open");
      }
    });
  };

  const toggleModal = (name) => {
    const modal = $(`${name}Modal`);
    const isOpen = modal.hasClass("open");
    closeModals();
    if (isOpen) {
      modal.addClass("closed");
      modal.removeClass("open");
    } else {
      $(`${name}Modal input`).val("");
      modal.addClass("open");
      modal.removeClass("closed");
    }
  };

  for (let i = 4; i < 9; i++) {
    $(`header li:nth-child(${i})`).click(() => {
      $(this).blur();
      toggleModal(modalsNames[i - 4]);
    });
  }

  $(".register").click(() => {
    $(this).blur();
    toggleModal(".register");
  });

  $(".auth").click(() => {
    $(this).blur();
    toggleModal(".auth");
  });

  $(".closeButton").click(() => {
    closeModals();
  });

  $(".search").click(() => {
    $(".searchModal > input[type='text']").focus();
  });

  $(".product .imgWrapper").click(() => {
    $("body").toggleClass("noScroll");
    $(".productModal").addClass("open");
  });

  $(".productModal .closeButton").click(() => {
    $("body").toggleClass("noScroll");
    $(".productModal").removeClass("open");
  });

  $(".contacts").click(() => {
    $("body").toggleClass("noScroll");
  });

  $(".contacts .closeButton").click(() => {
    $("body").toggleClass("noScroll");
  });

  $(".favouriteButton").click(function () {
    $(this).toggleClass("pressed");
  });

  ymaps.ready(init);

  function init() {
    const myMap = new ymaps.Map("map", {
      center: [55.7568, 37.6434],
      zoom: 16,
    });

    const myPlacemark = new ymaps.Placemark(
      [55.7568, 37.6434],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "/images/map-pin.png",
        iconImageSize: [70, 96],
        iconImageOffset: [-35, -96],
      }
    );

    myMap.geoObjects.add(myPlacemark);
  }
});
