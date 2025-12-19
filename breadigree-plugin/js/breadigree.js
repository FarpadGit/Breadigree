jQuery(document).ready( ($) => {
  jQuery("input#gallery_add_btn").click((e) => {
    e.preventDefault();
    let imageFrame;

    if(imageFrame){
      imageFrame.open();
      return;
    }

    // Define image_frame as wp.media object
    imageFrame = wp.media({
                    title: "Select Gallery Images",
                    multiple : true,
                    library : { type : "image" }
                  });

    imageFrame.on("close", () => {
      // On close, get selections and save to the hidden input
      // plus other AJAX stuff to refresh the image preview
      const selection =  imageFrame.state().get("selection");
      const files = [];
      selection.each((attachment) => {
        files.push({
                    id: attachment.attributes.id,
                    filename: attachment.attributes.filename,
                    url: attachment.attributes.url,
                    type: attachment.attributes.type,
                    subtype: attachment.attributes.subtype,
                    sizes: attachment.attributes.sizes,
                  });
      });
      const ids = files.map(file => file.id).join(",");

      //if closed withput selecting an image
      if(ids.length === 0) return true; 

      jQuery("input#gallery_image_ids").val(ids);
      refreshImages(ids);
    });

    imageFrame.on("open",() => {
      // On open, get the id from the hidden input
      // and select the appropiate images in the media manager
      const selection =  imageFrame.state().get("selection");
      const ids = jQuery("input#gallery_image_ids").val().split(",");
      ids.forEach((id) => {
        const attachment = wp.media.attachment(id);
        attachment.fetch();
        selection.add( attachment ? [attachment] : [] );
      });
    });

    imageFrame.open();
  });

  jQuery("input#gallery_save_btn").click((e) => {
    e.preventDefault();
    const ids = jQuery("input#gallery_image_ids").val();
    saveGallery(ids);
  });
});

// Ajax request to refresh the image previews
function refreshImages(imageIds) {
  const data = {
      action: "breadigree_get_images",
      ids: imageIds
  };

  jQuery.get(ajaxurl, data, (response) => {

      if(response.success === true) {
          jQuery("#gallery").empty();
          const newImages = response.data.images;
          
          newImages.forEach(image => {
            jQuery("#gallery").append(image);
          });
      }
  });
}

// Ajax request to save images to Gallery posts
function saveGallery(imageIds) {
  const data = {
      action: "breadigree_save_gallery",
      ids: imageIds
  };

  jQuery("input#gallery_save_btn").val("saving...");

  jQuery.get(ajaxurl, data, (response) => {

      if(response.success === true) {
          jQuery("input#gallery_save_btn").val("Gallery saved! 👍");
          setTimeout(() => {
            jQuery("input#gallery_save_btn").val("Save Gallery");
          }, 2000);
      }
  });
}