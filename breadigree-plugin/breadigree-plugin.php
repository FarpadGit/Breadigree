<?php

/**
* Plugin Name: Breadigree Plugin
* Description: Breadigree custom data
* Author: Fabok Arpad
* Author URI: https://www.fabokarpad.hu
* Version: 1.0.0
* Text Domain: breadigree-plugin
**/

if(!defined("ABSPATH")) {
  exit;
}

if(!class_exists("BreadigreePlugin")) {
    class BreadigreePlugin {
	
		public $category_name = "breadigree_category";
		public $product_name = "breadigree_product";
		public $gallery_name = "gallery";

		public function __construct() {
			add_action("init", [$this, "create_custom_types"]);
			add_action("init", [$this, "register_custom_meta_fields"]);
			add_action("admin_menu", [$this, "add_gallery_page_menu"]);
			add_action("admin_enqueue_scripts", [$this, "load_assets"]);
			add_action("add_meta_boxes", [$this, "add_metaboxes"]);
			add_action("save_post", [$this, "save_post_metadata"]);
			add_filter("use_block_editor_for_post_type", [$this, "disable_gutenberg"], 10, 2);
			add_action("wp_ajax_breadigree_get_images", [$this, "get_images"]);
			add_action("wp_ajax_breadigree_save_gallery", [$this, "save_gallery"]);
		}

		// turn gutenberg text editor into simple editor box
		public function disable_gutenberg($gutenberg_filter, $post_type) {
			if ($post_type === $this->product_name) return false;
			return $gutenberg_filter;
		}

		// load css and js assets
		public function load_assets() {
			wp_enqueue_media();
			wp_enqueue_style("breadigree", plugin_dir_url(__FILE__) . "css/breadigree.css", [], "1.0", "all");
			wp_enqueue_script("breadigree", plugin_dir_url(__FILE__) . "js/breadigree.js", ["jquery"], "1.0");
		}

		public function create_custom_types() {
			$this->create_category_type();
			$this->create_product_type();
			$this->create_gallery_type();
		}

		// create category type
		public function create_category_type() {
			$args = [
				"public" => true,
				"has_archive" => true,
				"rewrite" => ["slug" => "categories"],
				"supports" => ["title", "thumbnail", "custom-fields"],
				"exclude_from_search" => true,
				"publicly_queryable" => false,
				"capability" => "manage_options",
				"labels" => [
					"name" => "Categories", 
					"singular_name" => "Category",
					"menu_name" => "Categories",
					"name_admin_bar" => "Category",
					"add_new" => "Add New",
					"add_new_item" => "Add New Category",
					"new_item" => "New Category",
					"edit_item" => "Edit Category",
					"view_item" => "View Category",
					"all_items" => "All Categories",
					"search_items" => "Search Categories",
					"not_found" => "No categories found.",
					"not_found_in_trash" => "No categories found in Trash.",
					"featured_image" => "Category Image",
					"set_featured_image" => "Set category image",
					"remove_featured_image" => "Remove category image",
					"use_featured_image" => "Use as category image"
				],
				"menu_icon" => "dashicons-category",
				"show_in_rest" => true
			];

			register_post_type($this->category_name, $args);
		}

		// create product type
		public function create_product_type() {
			$args = [
				"public" => true,
				"has_archive" => true,
				"rewrite" => ["slug" => "products"],
				"supports" => ["title", "editor", "thumbnail", "custom-fields"],
				"exclude_from_search" => true,
				"publicly_queryable" => false,
				"capability" => "manage_options",
				"labels" => [
					"name" => "Products", 
					"singular_name" => "Product",
					"menu_name" => "Products",
					"name_admin_bar" => "Product",
					"add_new" => "Add New",
					"add_new_item" => "Add New Product",
					"new_item" => "New Product",
					"edit_item" => "Edit Product",
					"view_item" => "View Product",
					"all_items" => "All Products",
					"search_items" => "Search Products",
					"not_found" => "No products found.",
					"not_found_in_trash" => "No products found in Trash.",
					"featured_image" => "Product Image",
					"set_featured_image" => "Set product image",
					"remove_featured_image" => "Remove product image",
					"use_featured_image" => "Use as product image"
				],
				"menu_icon" => "dashicons-products",
				"show_in_rest" => true
			];

			register_post_type($this->product_name, $args);
		}

		// create gallery type
		public function create_gallery_type() {
			$args = [
				"public" => true,
				"has_archive" => true,
				"rewrite" => ["slug" => "gallery"],
				"supports" => ["thumbnail"],
				"exclude_from_search" => true,
				"publicly_queryable" => false,
				"capability" => "manage_options",
				"show_ui" => false,
				"show_in_nav_menus" => false,
				"show_in_rest" => true
			];

			register_post_type($this->gallery_name, $args);
		}

		// create meta fields for product price, product feature order, product category list and category product list
		function register_custom_meta_fields() {
			register_post_meta($this->product_name, "price", 
			[
				"type" => "string",
				"description" => "Product price",
				"single" => true,
				"show_in_rest" => true,
				"auth_callback" => function() {
					return current_user_can("edit_posts");
				},
			]);
			register_post_meta($this->product_name, "featured", 
			[
				"type" => "string",
				"description" => "Is Product featured and in what order",
				"single" => true,
				"show_in_rest" => true,
				"auth_callback" => function() {
					return current_user_can("edit_posts");
				},
			]);
			register_post_meta($this->product_name, "categories", 
			[
				"type" => "integer",
				"description" => "Product categories",
				"single" => false,
				"show_in_rest" => true,
				"auth_callback" => function() {
					return current_user_can("edit_posts");
				},
			]);
			register_post_meta($this->category_name, "products", 
			[
				"type" => "integer",
				"description" => "Category products",
				"single" => false,
				"show_in_rest" => true,
				"auth_callback" => function() {
					return current_user_can("edit_posts");
				},
			]);
		}

		// add metaboxes for editable slugs, product price, product feature order, product categories, a read-only list of category products, 
		// as well as removing the default boxes for custom meta tags WP adds when enabling custom-fields
		public function add_metaboxes() {
			add_meta_box("category_slug", "Slug", [ $this, "metabox_slug_html" ], $this->category_name, "normal");
			add_meta_box("product_slug", "Slug", [ $this, "metabox_slug_html" ], $this->product_name, "normal");
			add_meta_box("product_price", "Price", [ $this, "metabox_product_price_html" ], $this->product_name);
			add_meta_box("product_featured", "Is Product Featured?", [ $this, "metabox_product_featured_html" ], $this->product_name);
			add_meta_box("product_categories", "Categories", [ $this, "metabox_category_selector_html" ], $this->product_name);
			add_meta_box("category_products", "Products (read-only)", [ $this, "metabox_product_display_html" ], $this->category_name);
			remove_meta_box("postcustom", $this->category_name, "normal");
			remove_meta_box("postcustom", $this->product_name, "normal");
		}

		// callback when a post is being saved, checks for custom form fields and handles saving them
		public function save_post_metadata( int $post_id ) {
			// slug field
			if (array_key_exists("slug_field", $_POST)) {
				if($_POST["slug_field"] !== "") {
					remove_action("save_post", [ $this, "save_post_metadata" ]);

					$post = ["ID" => $post_id, "post_name" => $_POST["slug_field"]];
					wp_update_post($post);

					add_action("save_post", [ $this, "save_post_metadata" ]);
				}
			}

			if(get_post_type($post_id) === $this->product_name) {
				// calculating added and removed categories from product
				$all_categories = $this->get_all_of_post_type($this->category_name);
				$old_categories = get_post_meta($post_id, "categories", false);
				$selected_values = [];
				foreach($all_categories as $category) {
					$field_name = "category_field_" . $category["slug"];
					if(array_key_exists( $field_name, $_POST)) {
						if($_POST[$field_name] === "on") {
							$selected_values[] = $category["ID"];
						}
					}
				}

				// updating category list of post
				$deleted_categories = array_diff($old_categories, $selected_values);
				delete_post_meta($post_id, "categories", null);
				foreach ($selected_values as $value) {
					add_post_meta($post_id, "categories", $value);
				}
				// adding post to new categories
				foreach($selected_values as $category_id) {
					$current_products = get_post_meta($category_id, "products", false );
					if(!in_array($post_id, $current_products)) {
						add_post_meta($category_id, "products", $post_id);
					}
				}
				// deleting post from removed categories
				foreach($deleted_categories as $category_id) {
					$current_products = get_post_meta($category_id, "products", false );
					if(in_array($post_id, $current_products)) {
						delete_post_meta($category_id, "products", $post_id);
					}
				}

				// product price field
				if (array_key_exists("price_field", $_POST)) {
					update_post_meta($post_id, "price", $_POST["price_field"]);
				}
				// feature order field
				if (array_key_exists("featured_field", $_POST)) {
					if(array_key_exists("is_featured_field", $_POST) && $_POST["is_featured_field"] === "on") {
						update_post_meta($post_id, "featured", $_POST["featured_field"]);
					}
					else {
						delete_post_meta($post_id, "featured");
					}
				}
			}		
		}

		// HTML for slug input box
		public function metabox_slug_html( $post ) {
			$current_value = $post->post_name;
			?>
			
			<input 
				type="text" 
				name="slug_field"
				id="slug_field"
				value=<?php echo "\"$current_value\"" ?>
				placeholder="(Leave empty for default slug)"
			/>

			<?php
		}

		// HTML for featured input box
		public function metabox_product_featured_html( $post ) {
			$current_value = get_post_meta($post->ID, "featured", true );
			?>

			<p>
				<label for="is_featured_field">
					<input 
					type="checkbox" 
					name="is_featured_field" 
					id="is_featured_field"
					<?php checked(!empty($current_value), true, true) ?> 
				/>
					<?php echo "Feature This Product" ?>
				</label>
			</p>
			<p>
				<label for="featured_field">Feature Order (1 = first item in list, 2 = second item, etc.)</label>
				<input 
					type="number" 
					name="featured_field"
					id="featured_field"
					value=<?php echo "\"$current_value\"" ?>
					min="1"
				/>
			</p>

			<?php
		}

		// HTML for price input box on product form
		public function metabox_product_price_html( $post ) {
			$current_value = get_post_meta($post->ID, "price", true );
			if($current_value === "") $current_value = "1";
			?>

				<input 
				type="number" 
				name="price_field"
				id="price_field"
				value=<?php echo $current_value ?>
				min="1"
				/>
				<span> Ft</span>

			<?php
		}

		// HTML for category checkbox list on product form
		public function metabox_category_selector_html( $post ) {
			$current_values = get_post_meta($post->ID, "categories", false );
			$categories = $this->get_all_of_post_type($this->category_name);
			?>

			<?php foreach($categories as $category) {
				$field_name = "category_field_" . $category["slug"];
			?>
			<p>
				<label for=<?php echo $field_name ?>>
					<input 
						type="checkbox" 
						name=<?php echo $field_name ?> 
						id=<?php echo $field_name ?> 
						<?php checked(in_array($category["ID"], $current_values), true, true) ?> 
					/>
					<?php echo $category["title"] ?>
				</label>
			</p>
			<?php } ?>

			<?php
		}

		// HTML for read-only product list on category form
		public function metabox_product_display_html( $post ) {
			$products = get_post_meta($post->ID, "products", false );
			$all_products = $this->get_all_of_post_type($this->product_name);
			$titles = [];
			foreach ($all_products as $prod) {
				if(in_array($prod["ID"], $products)) {
					$titles[] = $prod["title"];
				}
			}
			?>

			<?php foreach($titles as $title) { ?>
			<p>
				<?php echo $title ?>
			</p>
			<?php } ?>

			<?php
		}

		// query helper function that retrieves every post of type $type_name
		protected function get_all_of_post_type( $type_name = "") {
			$items = [];
			if(!empty($type_name)) {
				$args = [
					"post_type" => "{$type_name}",
					"posts_per_page" => -1,
					"order" => "ASC",
					"orderby" => "title"
				];
				$results = new \WP_Query( $args );
				if( $results->have_posts() ) {
					while( $results->have_posts() ) {
						$post = $results->next_post();
						$items[] = [
							"ID" => $post->ID, 
							"title" => $post->post_title,
							"slug" => $post->post_name,
							"thumbnail" => $post->_thumbnail_id
						];
					}
				}
			}
			return $items;
		}

		// add custom admin page for editing the site gallery
		public function add_gallery_page_menu() {
			add_menu_page(
				"Gallery Page",
				"Gallery",
				"manage_options",
				"gallery-page",
				[$this, "gallery_page_html"],
				"dashicons-format-gallery", 
				50
			);
		}

		// HTML for the Gallery editing page
		function gallery_page_html() {
			$gallery = $this->get_all_of_post_type($this->gallery_name);
			$images = [];
			$image_ids = [];
			foreach ($gallery as $image) {
				$images[] = wp_get_attachment_image($image["thumbnail"], "medium", false, ["id" => "preview-image-$image_id"]);
				$image_ids[] = $image["thumbnail"];
			}
			?>

			<div>
				<h2>Gallery Selector</h2>
				<p>Add images to the website gallery</p>
			</div>

			<div class="gallery-buttons">
				<input type="hidden" name="gallery_image_ids" id="gallery_image_ids" value="<?php echo esc_attr(implode(',', $image_ids)); ?>" class="regular-text" />
				<input type="button" class="button-primary" value="Add New Images" id="gallery_add_btn" />
				<input type="button" class="button-primary" value="Save Gallery" id="gallery_save_btn" />
			</div>
			<div id="gallery" class="gallery">
				<?php 
					if (count($images) === 0) {
						echo '<p class="empty-message">There are currently no images in Gallery</p>';
					} 
					else {
						foreach ($images as $image) {
							echo $image;
						}
					}
				?>
			</div>
			<?php
		}

		function get_images() {
			if(isset($_GET["ids"])) {
				$image_ids = explode(",", $_GET["ids"]);
				$images = [];
				foreach ($image_ids as $image_id) {
					if(intval($image_id) > 0)
						$images[] = wp_get_attachment_image($image_id, "medium", false, ["id" => "preview-image-$image_id"]);
				}
				$data = ["images" => $images];
				wp_send_json_success($data);
			} 
			else {
				wp_send_json_error();
			}
		}

		function save_gallery() {
			if(isset($_GET["ids"])) {
				$image_ids = explode(",", $_GET["ids"]);
				$gallery = $this->get_all_of_post_type($this->gallery_name);
				foreach ($gallery as $image) {
					wp_delete_post($image["ID"], true);
				}
				foreach ($image_ids as $image_id) {
					$post = ["post_status" => "publish", "post_type" => $this->gallery_name, "_thumbnail_id" => $image_id];
					wp_insert_post($post);
				}
				wp_send_json_success();
			}
			else {
				wp_send_json_error();
			}
		}
    }
}

new BreadigreePlugin;

