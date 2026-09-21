<?php
namespace app\inc\elementor\widgets;

use app\inc\elementor\Elementor;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Image_Size;
use Elementor\Group_Control_Typography;
use Elementor\Utils;
use Elementor\Widget_Base;

/**
 * Card widget: image on top, centered title, short divider and description.
 * The whole card becomes a link when a URL is set.
 *
 * Design: Figma "Loving Heart" › Style 2 (node 2904:90)
 */
class Card extends Widget_Base
{
	public function get_name()
	{
		return 'lhr-card';
	}

	public function get_title()
	{
		return 'Card';
	}

	public function get_icon()
	{
		return 'eicon-image-box';
	}

	public function get_categories()
	{
		return [Elementor::CATEGORY];
	}

	public function get_keywords()
	{
		return ['card', 'image', 'link', 'loving heart'];
	}

	public function get_style_depends()
	{
		return ['lhr-elementor-card'];
	}

	protected function register_controls()
	{
		$this->registerContentControls();
		$this->registerStyleControls();
	}

	private function registerContentControls()
	{
		$this->start_controls_section('content_section', [
			'label' => 'Card',
			'tab'   => Controls_Manager::TAB_CONTENT,
		]);

		$this->add_control('image', [
			'label'   => 'Image',
			'type'    => Controls_Manager::MEDIA,
			'dynamic' => ['active' => true],
			'default' => ['url' => Utils::get_placeholder_image_src()],
		]);

		$this->add_group_control(Group_Control_Image_Size::get_type(), [
			'name'    => 'image_size',
			'default' => 'medium_large',
		]);

		$this->add_control('title', [
			'label'       => 'Title',
			'type'        => Controls_Manager::TEXT,
			'dynamic'     => ['active' => true],
			'default'     => 'Safari Tent',
			'placeholder' => 'Card title',
			'label_block' => true,
		]);

		$this->add_control('title_tag', [
			'label'   => 'Title HTML Tag',
			'type'    => Controls_Manager::SELECT,
			'options' => [
				'h2'  => 'H2',
				'h3'  => 'H3',
				'h4'  => 'H4',
				'h5'  => 'H5',
				'h6'  => 'H6',
				'div' => 'div',
				'p'   => 'p',
			],
			'default' => 'h3',
		]);

		$this->add_control('description', [
			'label'       => 'Description',
			'type'        => Controls_Manager::TEXTAREA,
			'dynamic'     => ['active' => true],
			'rows'        => 4,
			'default'     => 'For a quiet, intimate escape',
			'placeholder' => 'Short description',
		]);

		$this->add_control('link', [
			'label'       => 'Link',
			'type'        => Controls_Manager::URL,
			'dynamic'     => ['active' => true],
			'placeholder' => 'https://your-link.com',
			'description' => 'When set, the whole card becomes clickable.',
		]);

		$this->end_controls_section();
	}

	private function registerStyleControls()
	{
		/*------ title ------*/
		$this->start_controls_section('title_style_section', [
			'label' => 'Title',
			'tab'   => Controls_Manager::TAB_STYLE,
		]);

		$this->add_control('title_color', [
			'label'     => 'Color',
			'type'      => Controls_Manager::COLOR,
			'default'   => '#257f76',
			'selectors' => ['{{WRAPPER}} .lhr-card__title' => 'color: {{VALUE}};'],
		]);

		$this->add_group_control(Group_Control_Typography::get_type(), [
			'name'     => 'title_typography',
			'selector' => '{{WRAPPER}} .lhr-card__title',
		]);

		$this->end_controls_section();

		/*------ divider ------*/
		$this->start_controls_section('divider_style_section', [
			'label' => 'Divider',
			'tab'   => Controls_Manager::TAB_STYLE,
		]);

		$this->add_control('divider_color', [
			'label'     => 'Color',
			'type'      => Controls_Manager::COLOR,
			'default'   => '#c8ceb0',
			'selectors' => ['{{WRAPPER}} .lhr-card__divider' => 'background-color: {{VALUE}};'],
		]);

		$this->end_controls_section();

		/*------ description ------*/
		$this->start_controls_section('description_style_section', [
			'label' => 'Description',
			'tab'   => Controls_Manager::TAB_STYLE,
		]);

		$this->add_control('description_color', [
			'label'     => 'Color',
			'type'      => Controls_Manager::COLOR,
			'default'   => '#3c3e20',
			'selectors' => ['{{WRAPPER}} .lhr-card__description' => 'color: {{VALUE}};'],
		]);

		$this->add_group_control(Group_Control_Typography::get_type(), [
			'name'     => 'description_typography',
			'selector' => '{{WRAPPER}} .lhr-card__description',
		]);

		$this->end_controls_section();
	}

	protected function render()
	{
		$settings = $this->get_settings_for_display();

		$tag = 'div';
		$this->add_render_attribute('card', 'class', 'lhr-card');
		if (!empty($settings['link']['url'])) {
			$tag = 'a';
			$this->add_link_attributes('card', $settings['link']);
		}

		$title_tag = Utils::validate_html_tag($settings['title_tag']);
		?>
		<<?php echo $tag; ?> <?php echo $this->get_render_attribute_string('card'); ?>>
			<?php if (!empty($settings['image']['url'])) : ?>
				<div class="lhr-card__image">
					<?php echo Group_Control_Image_Size::get_attachment_image_html($settings, 'image_size', 'image'); ?>
				</div>
			<?php endif; ?>

			<div class="lhr-card__body">
				<?php if (!empty($settings['title'])) : ?>
					<<?php echo $title_tag; ?> class="lhr-card__title"><?php echo esc_html($settings['title']); ?></<?php echo $title_tag; ?>>
				<?php endif; ?>

				<?php if (!empty($settings['title']) && !empty($settings['description'])) : ?>
					<span class="lhr-card__divider" aria-hidden="true"></span>
				<?php endif; ?>

				<?php if (!empty($settings['description'])) : ?>
					<p class="lhr-card__description"><?php echo wp_kses_post(nl2br($settings['description'])); ?></p>
				<?php endif; ?>
			</div>
		</<?php echo $tag; ?>>
		<?php
	}
}
